const paymentController = require('../controllers/paymentController');
const authenticateToken = require("../utils/authenticateToken");

async function paymentRoutes(fastify, options) {
    fastify.get('/', {preValidation: [authenticateToken]}, paymentController.getTransactions)
    fastify.post('/send', { preValidation: [authenticateToken] }, paymentController.send);
    fastify.post('/withdraw', { preValidation: [authenticateToken] }, paymentController.withdraw);
    fastify.get('/:accountId', { preValidation: [authenticateToken] }, paymentController.getTransactionByAccountId);
}

module.exports = paymentRoutes;
