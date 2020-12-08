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
             const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '5h' });
             req.user = user;
             res.header("Autherization", accessToken);
            next();
        });
    } else {
        res.sendStatus(401);       
    }
 };

module.exports = {authenticateJWT}

