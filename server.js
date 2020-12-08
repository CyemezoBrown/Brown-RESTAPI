const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const posts = require("./routes/posts.routes")
//const userRouter = require("./routes/user.route")
const userroutes = require('./routes/user.route')
const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
//const userAdmin = require('./routes/login')
const jwt = require("jsonwebtoken")
const User =require("./models/user.model");
const  bcrypt =require("bcrypt");
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');

//const accessTokenSecret = 'hellothere122ncad'

require("dotenv").config()

let app = express();

const { json } = require("body-parser")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());

app.use(cookieParser())

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/posts', posts)
app.use('/api/user', userroutes)
// app.use(function(req, res, next) {
//     if (req.headers && req.headers['auth-token']){
//       jsonwebtoken.verify(req.headers['auth-token'], 'RESTFULAPIs', function(err, decode) {
//         if (err) req.user = undefined;
//         req.user = decode;
//         return next();
//       });
//     } else {
//       req.user = undefined; 
//       return next();
//     }
//    });
//userroutes(app);

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
