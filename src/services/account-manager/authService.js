const bcrypt = require('bcryptjs');
const prisma = require('@prisma/client').PrismaClient;
const jwt = require('jsonwebtoken');

const prismaClient = new prisma();

async function register(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    return user;
}

async function login(email, password) {
    const user = await prismaClient.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { token, user };
}

module.exports = {
    register,
    login,
};
