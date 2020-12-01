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

const { json } = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/user', userRouter)
app.use('/api', posts)
app.use(cookieParser())

app.post('/login', )
 

app.use(function(req, res, next){
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.JsonWebTokenError.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
})

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
