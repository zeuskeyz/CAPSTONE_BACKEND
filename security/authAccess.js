const { sign, verify } = require ('jsonwebtoken')

const createToken = (payload) => {
    const accessToken = sign(payload, process.env.JWT_KEY,{expiresIn:'1hr'})
    return accessToken
}

module.exports = { createToken}