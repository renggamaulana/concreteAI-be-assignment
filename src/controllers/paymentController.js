const paymentService = require('../services/PaymentService');

const send = async (request, reply) => {
    const { userId, amount, toAddress } = request.body;

    try {
        const payment = await paymentService.processPayment(userId, amount, toAddress, 'send');
        reply.send({ message: 'Transaction successful', payment });
    } catch (error) {
        console.error('Send transaction error:', error);
        reply.code(500).send({ message: 'Internal Server Error' });
    }
};

const withdraw = async (request, reply) => {
    const { userId, amount, toAddress } = request.body;

    try {
        const widthdrawal = await paymentService.processPayment(userId, amount, toAddress, 'withdraw');
        reply.send({ message: 'Withdrawal successful', widthdrawal });
    } catch (error) {
        console.error('Withdraw transaction error:', error);
        reply.code(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = {
    send,
    withdraw
};
