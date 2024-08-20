const accountModel = require("../models/accountModel")
const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

async function registerUser(username, password) {
    const user = await accountModel.createUser(username, password);
    const paymentAccount = await accountModel.createPaymentAccount(user.id);

    return {user, paymentAccount}
}

async function findUser(userId) {
    return accountModel.findUserById(userId);
}

async function loginUser(username, password) {
    const user = await accountModel.findUserByUsername(username);
    
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token };
}



module.exports = { registerUser, findUser, loginUser };
