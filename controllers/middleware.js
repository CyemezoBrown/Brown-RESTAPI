 require('dotenv').config()
 const jwt = require('jsonwebtoken')
 const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
 const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).send({
                    message : "Invalid token"
                    
                });
            }
            const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
            res.header("Autherization", accessToken);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {authenticateJWT}
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
