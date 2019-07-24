const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected...");
  } catch (err) {
    process.exit(1);
  }
};

// mongoose.connect("mongodb://localhost:27017/KitchenCatalogue")
module.exports = connectDB;
