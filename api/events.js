const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const SECRET = 'supersecretkey';

function readJSON(file) {
  const filePath = path.join(process.cwd(), 'backend', file);
  if (!fs.existsSync(filePath)) {
    // Fallback data if file doesn't exist
    if (file === 'events.json') {
      return [];
    }
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSON(file, data) {
  const filePath = path.join(process.cwd(), 'backend', file);
  // Ensure backend directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return null;
  
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const events = readJSON('events.json');

  if (req.method === 'GET') {
    // Get all events (public)
    res.json(events);
  } else if (req.method === 'POST') {
    // Add event (protected)
    const user = authenticateToken(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

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
      createdBy: user.username,
      createdAt: new Date().toISOString()
    };
    events.push(event);
    writeJSON('events.json', events);
    res.status(201).json(event);
  } else if (req.method === 'PUT') {
    // Edit event (protected)
    const user = authenticateToken(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.query;
    const idx = events.findIndex(e => e.id == id);
    if (idx === -1) return res.status(404).json({ message: 'Event not found' });
    
    // Only allow editing if user created the event or is admin
    if (events[idx].createdBy !== user.username && user.username !== 'admin') {
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
  } else if (req.method === 'DELETE') {
    // Delete event (protected)
    const user = authenticateToken(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.query;
    const idx = events.findIndex(e => e.id == id);
    if (idx === -1) return res.status(404).json({ message: 'Event not found' });
    
    const deleted = events[idx];
    const updatedEvents = events.filter(e => e.id != id);
    writeJSON('events.json', updatedEvents);
    res.json(deleted);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
