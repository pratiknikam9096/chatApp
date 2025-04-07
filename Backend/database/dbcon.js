const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.CONNECTION_MONGO);
    console.log("connected to mongo");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
