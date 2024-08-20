const db = require("../configs/db")


async function createPaymentAccount(userId) {
    return db.paymentAccount.create({
        data: {
            userId: userId,
            balance: 0 // Misalkan saldo awal 0
        },
    });
}