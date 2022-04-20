const mongoose  = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
//const mongoURI = 'mongodb://localhost:27017/mynotebook?readPreference=primary&ssl=false'
const mongoURI = process.env.MONGO_URI
//console.log(mongoURI)

const connectToMongo = () => {

    mongoose.connect(mongoURI , () => {
        console.log("Connected to Mongo DB Successfully");
    })
}
  
module.exports = connectToMongo; 