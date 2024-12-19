const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

module.exports = {
  port: process.env.PORT || 4000,
  databaseUrl: process.env.MONGO_URI,
  routePrefix: "/api",
};
