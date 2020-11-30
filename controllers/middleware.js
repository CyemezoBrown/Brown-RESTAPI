// const jwt = require('jsonwebtoken')

// exports.verify = function(req, res, next){
//     let accessToken = req.cookies.jwt

//     //if there is no token stored in cookies, the request is unauthorized
//     if (!accessToken){
//         return res.status(403).send()
//     }


//     let verified
//     try{
//         //use the jwt.verify method to verify the access token
//         //throws an error if the token has expired or has a invalid signature
//         payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
//         req.user = verfied
//         next()
//     }
//     catch(e){
//         //if an error occured return request unauthorized error
//         return res.status(401).send('Invalid token')
//     }
// }

const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
    const accessToken = req.header("auth")
    if(!accessToken) return res.status(401).send('Access denied')
    try{
        const verified =jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        req.user = verified
        next()
     }catch(error){
         res.status(400).send('Invalid token')
     }
}