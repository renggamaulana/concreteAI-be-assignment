const jwt = require('jsonwebtoken');

function authenticateToken(request, reply, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return reply.code(401).send({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return reply.code(403).send({ message: 'Invalid token' });
        }
        request.user = user;
        next();
    });
}

module.exports = authenticateToken;
