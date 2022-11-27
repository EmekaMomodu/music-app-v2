const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key.pub'), 'utf8');

exports.generateToken = (userId) => {
    try {
        return jwt.sign({userId: userId}, privateKey,
            {expiresIn: process.env.JWT_EXPIRES_IN, algorithm: 'RS256'}, undefined);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        throw error;
    }
}

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, publicKey, {algorithm: 'RS256'}, undefined);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        throw error;
    }
}
