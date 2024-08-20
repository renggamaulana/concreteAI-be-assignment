const paymentModel = require("../models/paymentModel");
const db = require("../configs/db");

const sendPayment = async (userId, amount, toAccountId) => {
    
    const transaction = await db.$transaction(async (prisma) => {
        
        const senderAccount = await prisma.paymentAccount.findFirst({
            where: { userId: userId },
        });

        if (!senderAccount) {
            throw new Error('Sender account not found');
        }

        if (senderAccount.balance < amount) {
            throw new Error('Insufficient funds' + senderAccount.balance);
        }

        const recipientAccount = await prisma.paymentAccount.findFirst({
            where: { userId: toAccountId },
        });

        if (!recipientAccount) {
            throw new Error('Recipient account not found');
        }
        const payment = await prisma.transaction.create({
            data: {
                amount,
                type: "Send",
                paymentAccountId: senderAccount.id,
                toAccountId: recipientAccount.id,
                status: 'Pending',
            },
        });

        await prisma.paymentAccount.update({
            where: { id: senderAccount.id },
            data: { balance: senderAccount.balance - amount },
        });

        await prisma.paymentAccount.update({
            where: { id: recipientAccount.id },
            data: { balance: recipientAccount.balance + amount },
        });

        // Create PaymentHistory entry
        await prisma.paymentHistory.create({
            data: {
                amount,
                paymentAccountId: senderAccount.id,
                type: "Send",
                status: 'Pending',
                toAccountId: recipientAccount.id,
            },
        });

        setTimeout(async () => {
            await prisma.transaction.update({
                where: { id: payment.id },
                data: { status: 'Completed' },
            });

            // Update PaymentHistory status
            await prisma.paymentHistory.update({
                where: { id: payment.id },
                data: { status: 'Completed' },
            });
        }, 30000);

        return payment;
    });

    return transaction;
};

const withdrawFunds = async (userId, amount) => {
    const transaction = await db.$transaction(async (prisma) => {
        const account = await prisma.paymentAccount.findFirst({
            where: { userId: userId },
        });

        if (!account) {
            throw new Error('Account not found');
        }

        if (account.balance < amount) {
            throw new Error('Insufficient funds');
        }

        const withdrawal = await prisma.transaction.create({
            data: {
                amount,
                type: "Withdraw",
                toAccountId:account.id,
                status: 'Pending',
                paymentAccount : {
                    connect: {
                        id: account.id
                    }
                }
            },
        });

        await prisma.paymentAccount.update({
            where: { id: account.id },
            data: { balance: account.balance - amount },
        });

        setTimeout(async () => {
            await prisma.transaction.update({
                where: { id: payment.id },
                data: { status: 'Completed' },
            });
        }, 30000);


        return withdrawal;
    });

    return transaction;
};

const getTransactions = async () => {
    try {
        const transactions = await db.transaction.findMany();

        return transactions;
    } catch (error) {
        console.error('Error in get transactions service:', error);
        throw new Error('Unable to fetch transactions');
    }
};

async function getTransactionsByAccountId(id) {
    return await paymentModel.getTransactionsByAccountId(id);
}

module.exports = {
    sendPayment,
    withdrawFunds,
    getTransactions,
    getTransactionsByAccountId,
};
