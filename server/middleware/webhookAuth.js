const crypto = require('crypto');

const webhookAuth = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') return next();

  const signature = req.headers['x-game-signature'];
  if (!signature) {
    return res.status(401).json({ error: 'Missing signature header' });
  }

  if (!process.env.WEBHOOK_SECRET) {
    return res.status(500).json({ error: 'WEBHOOK_SECRET not configured' });
  }

  const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
  const computedSignature = hmac.update(JSON.stringify(req.body)).digest('hex');

  if (computedSignature !== signature) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  next();
};

module.exports = webhookAuth;