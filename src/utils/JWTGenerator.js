let jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.SECRET_KEY

function createToken(payload) {
    return jwt.sign(payload, JWT_SECRET)
}

function validateToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {createToken, validateToken}
