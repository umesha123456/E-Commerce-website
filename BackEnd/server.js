require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');
const Product = require('./product-api/models/Product');

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Login Route (demo)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// JWT Middleware (protects all routes except /login)
app.use(expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/login'] }));

// Get 50 products by status
app.get('/api/products', async (req, res) => {
  const { status } = req.query;
  if (!['published', 'not published'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }
  const products = await Product.find({ status }).limit(50);
  res.json(products);
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.status(401).json({ error: 'Invalid token' });
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
