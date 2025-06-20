const express = require('express');
const router = express.Router();
const webhookAuth = require('../middleware/webhookAuth');
const gameController = require('../controllers/gameWebhookController');

// Placeholder functions (implement server-side)
const authenticateUser = (req, res, next) => {
  req.user = { id: 'test_user' }; // Replace with real auth logic
  next();
};

const generateServerSideToken = (user) => {
  return 'server-generated-token'; // Replace with real JWT logic
};

router.post('/game/webhook', webhookAuth, gameController.webhookHandler);
router.get('/game/token', authenticateUser, (req, res) => {
  const token = generateServerSideToken(req.user);
  res.json({ token });
});

module.exports = router;