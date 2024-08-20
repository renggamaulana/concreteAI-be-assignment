
const db = require("../configs/db");


const createUser = async (username, password) => {
    return db.user.create({
        data: {username, password},
    });
}

const findUserById = async (id) => {
    return db.user.findUnique({ where: {id} })
}

const findUserByUsername = async (username) => {
    return db.user.findUnique({ where: {username} })
}


const createPaymentAccount = async (userId, balance) => {
    return db.paymentAccount.create({
        data: {
            userId: userId,
            balance: balance
        },
    });
}

module.exports = {createUser, findUserById, createPaymentAccount, findUserByUsername};