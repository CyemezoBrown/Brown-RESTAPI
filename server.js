const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const posts = require("./routes/posts.routes")
const userRouter = require("./routes/user.route")


let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/user', userRouter)
app.use('/api', posts)


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
