const mongoose = require('mongoose');
const config = require('config');
const db = config.get("mongoURI")

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    
    console.log("mongoDB connected successfully...");    
  } catch (error) {
    console.error(error.message);
    process.exit(1)
  }
}

module.exports = connectDB;