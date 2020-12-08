const userController = require('../controllers/user.controller');
const userroutes = function(app) {

   
app.post('/api/user/register', userController.register);
app.post('/api/user/login',  userController.login);
};
module.exports = userroutes
// // user.route.js




// const router = require('express').Router();
// let User = require('../models/user.model');
// let bcrypt  =require("bcrypt");
// const jwt = require("jsonwebtoken")

// router.post('/login',async (req, res) => {
//     let username = req.body.username
//     // let hash = await  bcrypt.hash(req.body.password,saltRound=10).then(hash => hash)
//     User.findOne({username:username})
//     .then(user=>{
//         if(!user) return res.status(404).json({
//             message:"username or password incorrect",                              
//         })
        
//         // {
//             let accessToken;
//            return bcrypt.compare(req.body.password,user.password,(err,result)=>{
//                 console.log(result)
//                 if (err) return res.status(401).json({ message:"Failed to login"});
//                 // }else{
//                      accessToken = jwt.sign({
//                         username:req.body.username,
//                     }, process.env.ACCESS_TOKEN_SECRET, {
//                         expiresIn: process.env.ACCESS_TOKEN_LIFE
//                     });
                    
//                 return res.status(200).json({
//                         accessToken,
//                     })

//                 // } 
//                 // else {
//                 //     accessToken = jwt.sign({
//                 //         username:req.body.username,                       
//                 //     }, process.env.ACCESS_TOKEN_SECRET, {
//                 //         expiresIn: process.env.ACCESS_TOKEN_LIFE
//                 //     });
//                 //     return res.status(403).send({
//                 //         message : "Forbidden"
//                 //     })
//                 // }
//             })
//         // } else {
//         //     return res.status(404).json({
//         //         message:"username or password incorrect",                              
//         //     })
//         // }
//     }).catch(err=>{
//         console.log(err.message)
//         // return res.status(500).send(err)
//     }) 
// });
// module.exports = router;