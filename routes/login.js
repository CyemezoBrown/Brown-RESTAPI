// const jwt = require("jsonwebtoken")
// const  bcrypt =require("bcrypt");
// const User = require("../models/user.model")
// const accessTokenSecret = 'hellothere122ncad'


//     let username = req.body.username
//     let password = req.body.password
//     User.findOne({username:username}).exec()
//     .then(user , (req, res)=>{
//         if(user){
//             bcrypt.compare(req.body.password,user.password,(err,result)=>{
//                 if(err){
//                     return res.status(401).json({
//                         message:"Username or password incorrect"
//                     })
//                 }else if(result){
//                     let accessToken = jwt.sign({
//                         username:req.body.username,
//                         password:req.body.password
//                     }, process.env.ACCESS_TOKEN_SECRET, {
//                         expiresIn: process.env.ACCESS_TOKEN_LIFE
//                     });
//                     res.status(201).json({
//                        // message:"logged in successfull",
//                         token:accessToken
//                     })

//                 }
//             })
//         }
//     }).catch(err=>{
//         res.status(500).send(err)
//     })
