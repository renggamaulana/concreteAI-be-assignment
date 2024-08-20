const paymentService = require('../services/PaymentService');

const send = async (request, reply) => {
    const userId = request.user.id;
    const { amount, toAddress } = request.body;

    try {
        const payment = await paymentService.sendPayment(userId, amount, toAddress);
        reply.send({ message: 'Transaction successful', payment });
    } catch (error) {
        console.error('Send transaction error:', error);
        reply.code(500).send({ message: 'Internal Server Error' });
    }
};

const withdraw = async (request, reply) => {
    const { userId, amount, toAddress } = request.body;

    try {
        const widthdrawal = await paymentService.withdrawFunds(userId, amount);
        reply.send({ message: 'Withdrawal successful', widthdrawal });
    } catch (error) {
        console.error('Withdraw transaction error:', error);
        reply.code(500).send({ message: 'Internal Server Error' });
    }
};

async function getTransactionByAccountId(request, reply) {
    const { accountId } = request.params;

    try {
        const transactions = await paymentService.getTransactionsByAccountId(accountId);
        return reply.send(transactions);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: 'Failed to fetch transactions' });
    }
}

module.exports = {
    send,
    withdraw,
    getTransactionByAccountId
};
