 const jwt = require('jsonwebtoken')
 
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


// module.exports = function (req,res,next){
//     const accessToken = req.header("auth")
   
//     if(!accessToken) return res.status(401).send('Access denied')
//     try{
        
//         const verified =jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
//         req.user = verified
        
//         next()
//      }catch(error){
//          res.status(400).send('Invalid token')
//      }
// }
