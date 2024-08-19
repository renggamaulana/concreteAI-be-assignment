const authService = require('../services/account-manager/authService');

async function registerHandler(request, reply) {
    const { email, password } = request.body;

    try {
        const user = await authService.register(email, password);
        reply.send({ user });
    } catch (error) {
        reply.status(400).send({ error: error.message });
    }
}

async function loginHandler(request, reply) {
    const { email, password } = request.body;

    try {
        const { token, user } = await authService.login(email, password);
        reply.send({ token, user });
    } catch (error) {
        reply.status(400).send({ error: error.message });
    }
}

module.exports = {
    registerHandler,
    loginHandler,
};
