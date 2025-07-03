const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // Now req.user is available and contains the authenticated user's ID
    res.json({ message: `This is a protected route. Your user ID is: ${req.user}` });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
