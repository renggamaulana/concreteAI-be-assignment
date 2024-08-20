const paymentService = require('../services/PaymentService');

const send = async (request, reply) => {
    const userId = request.user.id;
    const { amount, toAccountId } = request.body;

    try {
        const payment = await paymentService.sendPayment(userId, amount, toAccountId);
        reply.send({ message: 'Transaction successful', payment });
    } catch (error) {
        console.error('Send transaction error:', error.message);
        reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

const withdraw = async (request, reply) => {
    const userId = request.user.id;
    const { amount } = request.body;

    try {
        const widthdrawal = await paymentService.withdrawFunds(userId, amount);
        reply.send({ message: 'Withdrawal successful', widthdrawal });
    } catch (error) {
        console.error('Withdraw transaction error:', error);
        reply.code(500).send({ message: 'Internal Server Error',error: error.message });
    }
};
 
async function getTransactionByAccountId(request, reply) {
    const { accountId } = request.params;
    const id = parseInt(accountId);
    try {
        const transactions = await paymentService.getTransactionsByAccountId(id);
        if (!transactions || transactions.length === 0) {
            return reply.status(404).send({ message: 'No transactions found for this account' });
        }
        return reply.send(transactions);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Failed to fetch transactions', error: error.message });
    }
}

const getTransactions = async(req, reply) => {
    try {
        const transactions = await paymentService.getTransactions();

        if (!transactions || transactions.length === 0) {
            return reply.status(404).send({ message: 'No transactions found' });
        }

        return reply.send(transactions);
    } catch (error) {
        console.error('Error in get transactions controller:', error);

        return reply.status(500).send({ message: 'Failed to fetch transactions', error: error.message });
    }
}

module.exports = {
    send,
    withdraw,
    getTransactionByAccountId,
    getTransactions
};
