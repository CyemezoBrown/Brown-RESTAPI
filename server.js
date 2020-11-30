const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const posts = require("./routes/posts.routes")
const userRouter = require("./routes/user.route")
const jwt = require("jsonwebtoken")
const User=require("./models/user.model");
const  bcrypt =require("bcrypt");
require("dotenv").config()


let app = express();

const login= require("./routes/login")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/user', userRouter)
app.use('/api', posts)
app.use(cookieParser())

 app.post('/login', (req, res)=>{

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
                        username:req.body.username,
                        password:req.body.password
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: process.env.ACCESS_TOKEN_LIFE
                    });
                    res.status(201).json({
                        message:"logged in successfull",
                        token:accessToken
                    })

                }
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })})
// app.post('/refresh', refresh)


const uri = "mongodb+srv://brown:test1234@cluster0.7ajvg.mongodb.net/portfolio?retryWrites=true;"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const port = process.env.PORT || 3005;
app.listen(
    port,
    console.log('server started - 3005'),
);

 module.exports = app;
