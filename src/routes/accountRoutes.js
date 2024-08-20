const accountController = require('../controllers/accountController');

async function accountRoutes(fastify, options) {
    fastify.post('/register', accountController.register);
    fastify.post('/login', accountController.login);
}


module.exports = accountRoutes;