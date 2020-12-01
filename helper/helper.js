const jwt = require('jsonwebtoken')

module.exports = function (loaded){
        const token =jwt.generate(loaded, process.env.ACCESS_TOKEN_SECRET)
        return token
}
