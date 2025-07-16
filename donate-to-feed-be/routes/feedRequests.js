const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FeedRequest = require('../models/FeedRequest');
const Donation = require('../models/Donation');

// Create feed request
router.post('/', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.body.donationId);
    if (!donation || donation.status !== 'available') {
      return res.status(400).json({ error: 'Donation not available' });
    }

    const feedRequest = new FeedRequest({
      requester: req.user.id,
      donation: req.body.donationId,
      message: req.body.message
    });

    await feedRequest.save();
    donation.status = 'reserved';
    await donation.save();

    res.status(201).json(feedRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all feed requests (for admins)
router.get('/', auth, async (req, res) => {
  try {
    const requests = await FeedRequest.find()
      .populate('donation')
      .sort('-createdAt');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's feed requests
router.get('/me', auth, async (req, res) => {
  try {
    const requests = await FeedRequest.find({ requester: req.user.id })
      .populate('donation')
      .sort('-createdAt');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update request status (for donors)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const request = await FeedRequest.findById(req.params.id)
      .populate('donation');
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.donation.donor.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    request.status = req.body.status;
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
