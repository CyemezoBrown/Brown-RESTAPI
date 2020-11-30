const jwt = require("json-web-token")
const User=require("../models/user.model");
const  bcrypt =require("bcrypt");
const PostController = require("../controllers/post.controller");
require("dotenv").config


exports.login = function(req, res){

    let username = req.body.username
    let password = req.body.password
    User.findOne({username:username}).exec()
    .then(user=>{
        if(user){
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Failed to loggin"
                    })
                }else if(result){
                    let accessToken = jwt.sign({
                        email:req.body.email,
                        password:req.body.password
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: process.env.ACCESS_TOKEN_LIFE
                    })
                    res.status(201).json({
                        message:"logged in successfull",
                        token:accessToken
                    })

                }
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
    
//     //use the payload to store information about the user such as username, user role, etc.
//     let payload = {username: username}

//     //create the access token with the shorter lifespan

//     //create the refresh token with the longer lifespan
//     let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//         algorithm: "HS256",
//         expiresIn: process.env.REFRESH_TOKEN_LIFE
//     })

//     //store the refresh token in the user array
//     users[username].refreshToken = refreshToken

//     //send the access token to the client inside a cookie
//     res.cookie("jwt", accessToken, {secure: true})
//     res.send()
 }