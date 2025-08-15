import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;
const SECRET = 'supersecretkey';

app.use(cors());
app.use(bodyParser.json());

function readJSON(file) {
  const filePath = path.join(process.cwd(), 'backend', file);
  if (!fs.existsSync(filePath)) {
    if (file === 'users.json') {
      return [{ username: 'admin', password: 'admin123' }];
    }
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSON(file, data) {
  const filePath = path.join(process.cwd(), 'backend', file);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

// Login endpoint
app.post('/api/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { username, password } = req.body;
  const users = readJSON('users.json');
  console.log('Users loaded:', users);
  const user = users.find(u => u.username === username && u.password === password);
  console.log('User found:', user);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Get all events
app.get('/api/events', (req, res) => {
  const events = readJSON('events.json');
  res.json(events);
});

// Add event
app.post('/api/events', authenticateToken, (req, res) => {
  const events = readJSON('events.json');
  const event = { 
    id: Date.now(), 
    title: req.body.title,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description,
    sponsors: req.body.sponsors || '',
    image: req.body.image || '',
    room: req.body.room || '',
    createdBy: req.user.username,
    createdAt: new Date().toISOString()
  };
  events.push(event);
  writeJSON('events.json', events);
  res.status(201).json(event);
});

// Edit event
app.put('/api/events/:id', authenticateToken, (req, res) => {
  const events = readJSON('events.json');
  const idx = events.findIndex(e => e.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Event not found' });
  
  if (events[idx].createdBy !== req.user.username && req.user.username !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to edit this event' });
  }
  
  events[idx] = { 
    ...events[idx], 
    title: req.body.title,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description,
    sponsors: req.body.sponsors || '',
    image: req.body.image || '',
    room: req.body.room || '',
    updatedAt: new Date().toISOString()
  };
  writeJSON('events.json', events);
  res.json(events[idx]);
});

// Delete event
app.delete('/api/events/:id', authenticateToken, (req, res) => {
  let events = readJSON('events.json');
  const idx = events.findIndex(e => e.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Event not found' });
  
  const deleted = events[idx];
  events = events.filter(e => e.id != req.params.id);
  writeJSON('events.json', events);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Development API server running on http://localhost:${PORT}`);
});
