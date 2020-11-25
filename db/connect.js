// import mongoose from 'mongoose';
// import config from '../config/index';

const mongoose = require("mongoose")
const config = require("../config/index")

mongoose.Promise = global.Promise;

const connectToDb = async function() {
    try {
        await mongoose.connect(config.mongoUrl, { useMongoClient: true });
        
    }
    catch (err) {
        
      console.log(err);
    }
}

//export default connectToDb;

module.exports = connectToDb;