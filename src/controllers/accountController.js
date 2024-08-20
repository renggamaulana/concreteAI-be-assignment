const accountService = require("../services/accountManager");
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

module.exports = { register, login };
