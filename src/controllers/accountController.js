const accountService = require("../services/accountService");
const argon2 = require("argon2");

const register = async (request, reply) => {
    const { username, password } = request.body;
    const hashedPassword = await argon2.hash(password);
    const account = await accountService.registerUser(username, hashedPassword);
    reply.send(account);
}

const login = async (request, reply) => {
    const { username, password } = request.body;
    const account = await accountService.loginUser(username, password);
    reply.send({message: "Succesfully logged in!", account});
}

const createAccount = async (request, reply) => {
    const { type } = request.body; // Optional, default to 'Debit'
    const userId = request.user.id;

    try {
        const account = await accountService.createPaymentAccount(userId, type || 'Debit');
        reply.send({ message: 'Account created successfully', account });
    } catch (error) {
        console.error('Create account error:', error);
        return reply.code(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login,
    createAccount
};
