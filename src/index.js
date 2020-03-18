import http from "http";
import app from "./server";
import pg from "pg";
const socketIo = require("socket.io");

const dbConfig = {
  user: "domotang",
  password: "def00lisn",
  host: "10.0.0.237",
  db: "domotang",
  table: "shipments"
};

const connectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}`;

const pgClient = new pg.Client(connectionString);

pgClient.connect();

const query = pgClient.query("LISTEN new_changeevent");

pgClient.on("notification", data => {
  var payload = JSON.parse(data.payload);
  console.log("data change", payload);
  io.emit("FromAPI", "test");
});

var server = http.createServer(app);
var io = socketIo(server);

server.listen(8000, "0.0.0.0", () => {
  console.log("Server listening on port 8000");
});
