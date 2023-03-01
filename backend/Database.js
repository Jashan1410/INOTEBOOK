const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connectToMongo() {
  try {
    await mongoose.connect('mongodb+srv://jashan:jashan@jashan.ulgyp2g.mongodb.net/inotebook?retryWrites=true&w=majority',()=>{console.log("connect to mongodb sucessfull")})
  } catch (error) {
    console.log("failed Connect Database")
  } 
}

module.exports = connectToMongo;



