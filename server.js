//import express from 'express';
// import bodyParser from 'body-parser';
// import posts from './routes/posts.routes';
//import mongoose from 'mongoose'
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const posts = require("./routes/posts.routes")

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api', posts)


const uri = "mongodb+srv://brown:test1234@cluster0.7ajvg.mongodb.net/portfolio?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const port = process.env.PORT || 3000;
app.listen(
    port,
    console.log('server started - 3000'),
);

 module.exports = app;
