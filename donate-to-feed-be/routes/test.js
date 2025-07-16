const express = require('express');
const router = express.Router();

router.get('/test', async (req, res) => {
  try {
    res.json({ message: 'Database connection successful' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

module.exports = router;
