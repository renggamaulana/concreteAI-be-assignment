const db = require('../configs/db');


const sendPayment = async (userId, amount, toAddress) => {
    
    const transaction = await db.$transaction(async (prisma) => {
        
        const senderAccount = await db.paymentAccount.findFirst({
            where: { userId: userId },
        });

        if (!senderAccount) {
            throw new Error('Sender account not found');
        }

        if (senderAccount.balance < amount) {
            throw new Error('Insufficient funds');
        }

        const recipientAccount = await db.paymentAccount.findFirst({
            where: { id: toAddress },
        });

        if (!recipientAccount) {
            throw new Error('Recipient account not found');
        }

        await prisma.paymentAccount.update({
            where: { id: senderAccount.id },
            data: { balance: senderAccount.balance - amount },
        });

        await prisma.paymentAccount.update({
            where: { id: recipientAccount.id },
            data: { balance: recipientAccount.balance + amount },
        });

        const payment = await prisma.payment.create({
            data: {
                amount,
                paymentAccountId: senderAccount.id,
                toAddress,
                status: 'Completed',
            },
        });

        return payment;
    });

    return transaction;
};

const withdrawFunds = async (userId, amount) => {
    const transaction = await db.$transaction(async (prisma) => {
        const account = await prisma.paymentAccount.findUnique({
            where: { userId: userId },
        });

        if (!account) {
            throw new Error('Account not found');
        }

        if (account.balance < amount) {
            throw new Error('Insufficient funds');
        }

        await prisma.paymentAccount.update({
            where: { id: account.id },
            data: { balance: account.balance - amount },
        });

        const withdrawal = await prisma.payment.create({
            data: {
                amount,
                paymentAccountId: account.id,
                toAddress: 'Withdraw',
                status: 'Completed',
            },
        });

        return withdrawal;
    });

    return transaction;
};

async function getTransactionsByAccountId(accountId) {
    return await db.transaction.find({ paymentAccountId: accountId });
}

module.exports = {
    sendPayment,
    withdrawFunds,
    getTransactionsByAccountId
};
