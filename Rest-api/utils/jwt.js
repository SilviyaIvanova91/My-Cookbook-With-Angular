const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = process.env.SECRET || 'SoftSecret';
const runtimeSecret = `${secret}:${crypto.randomBytes(32).toString('hex')}`;

function createToken(data) {
    return jwt.sign(data, runtimeSecret, { expiresIn: '1d' });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, runtimeSecret, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

module.exports = {
    createToken,
    verifyToken
}