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
