import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const SECRET = 'supersecretkey';

function readJSON(file) {
  const filePath = path.join(process.cwd(), 'backend', file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
}
