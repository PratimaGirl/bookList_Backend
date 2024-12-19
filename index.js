const http = require("http");

const app = require("./app.js");
const config = require("./config/index.js");
const connectDatabase = require("./db/connection.js");

const server = http.createServer(app);

connectDatabase();

process.on("uncaughtException", (error) => {
  console.log("ERROR :" + error.stack);
  console.log("Server is going down due to uncaught exception.");
  process.exit(1);
});

server.listen(config.port, async () => {
  console.log("Server is running on port: ", config.port);
});

process.on("unhandledRejection", (error) => {
  console.log("ERROR :" + error.stack);
  server.close(() => {
    process.exit(1);
  });
  console.log("Server is going down due to unhandled promise rejection.");
});

module.exports = app;
