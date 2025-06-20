const crypto = require('crypto');
const { updateUserBalance } = require('./userService');

exports.webhookHandler = async (req, res) => {
  try {
    const signature = req.headers['x-game-signature'];
    const isValid = verifyWebhookSignature(req.body, signature);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const result = await processWebhookData(req.body);
    res.status(200).json({ 
      success: true,
      processedAt: new Date().toISOString(),
      transactionId: result.transactionId
    });
  } catch (error) {
    console.error('Webhook processing error:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyWebhookSignature = (payload, signature) => {
  if (!process.env.WEBHOOK_SECRET) throw new Error('WEBHOOK_SECRET not configured');
  const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
  const computedSignature = hmac.update(JSON.stringify(payload)).digest('hex');
  return computedSignature === signature;
};

exports.processWebhookData = async (data) => {
  const requiredFields = ['user_id', 'bet_amount', 'status', 'timestamp'];
  for (const field of requiredFields) {
    if (!data[field]) throw new Error(`Missing required field: ${field}`);
  }

  const transaction = {
    userId: data.user_id,
    amount: data.bet_amount,
    status: data.status,
    payout: data.payout || 0,
    crashPoint: data.crash_point,
    transactionId: data.transaction_id || crypto.randomUUID(),
    processedAt: new Date()
  };

  await updateUserBalance(
    transaction.userId,
    transaction.status === 'won' ? transaction.payout : -transaction.amount
  );

  return transaction;
};