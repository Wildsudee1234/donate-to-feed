const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Donation = require('../models/Donation');

// Create donation
router.post('/', auth, async (req, res) => {
  try {
    const donation = new Donation({
      ...req.body,
      donor: req.user.id
    });
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' })
      .populate('donor', 'name')
      .sort('-createdAt');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update donation
router.put('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    
    if (donation.donor.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    Object.assign(donation, req.body);
    await donation.save();
    res.json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete donation
router.delete('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    
    if (donation.donor.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    await donation.remove();
    res.json({ message: 'Donation removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
