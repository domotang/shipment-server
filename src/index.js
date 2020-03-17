import http from "http";
import app from "./server";

var server = http.createServer(app);

server.listen(8000, "0.0.0.0", () => {
  console.log("Server listening on port 8000");
});
