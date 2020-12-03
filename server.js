const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const posts = require("./routes/posts.routes")
const userRouter = require("./routes/user.route")
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
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
app.use('/api/user', userRouter)
app.use('/api/posts', posts)
//app.use('api/user', userAdmin)

//catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.post('/login')
// app.post('/login', (user, req, res) => {
//     const username = req.body.username
//     //const password = req.body.password
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

// });
// const users = [
//     {
//         username: 'brown',
//         password: 'password',
//         role: 'admin'
//     }, {
//         username: 'anna',
//         password: 'password123member',
//         role: 'member'
//     }
// ];
// app.post('/login', (req, res) => {
//     // Read username and password from request body
//     const { username, password } = req.body;

//     // Filter user from the users array by username and password
//     const user =users.find(u => u.username === username && u.password === password);

//     if (user) {
//         // Generate an access token
//         const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

//         res.json({
//             accessToken
//         });
//     } else {
//         res.send('Username or password incorrect');
//     }

// });

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
