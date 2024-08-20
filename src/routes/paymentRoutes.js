const paymentController = require('../controllers/paymentController');
const authenticateToken = require("../utils/authenticateToken");

async function paymentRoutes(fastify, options) {
    fastify.post('/send', { preValidation: [authenticateToken] }, paymentController.send);
    fastify.post('/withdraw', { preValidation: [authenticateToken] }, paymentController.withdraw);
}

module.exports = paymentRoutes;
