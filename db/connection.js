const { connect } = require("mongoose");

const config = require("../config/index");

const connectDatabase = async () => {
  try {
    await connect(config.databaseUrl);
    console.log("database: ", config.databaseUrl);
    console.log("Connected to Database successfully.");
  } catch (error) {
    console.error("Failed to connect to Database:");
    process.exit(1);
  }
};

module.exports = connectDatabase;
