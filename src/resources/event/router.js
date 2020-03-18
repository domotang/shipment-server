import express from "express";
import pg from "pg";
require("dotenv").config();

var router = express.Router();

router.route("/").get(eventRouter);

function eventRouter(req, res) {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  const connectionString = process.env.DB_CONNECT_STRING;
  const pgClient = new pg.Client(connectionString);
  pgClient.connect();
  const query = pgClient.query("LISTEN new_changeevent");

  pgClient.on("notification", data => {
    var payload = JSON.parse(data.payload);
    console.log("data change", payload);
    res.write(`data: ${JSON.stringify({ num: payload })}\n\n`);
  });

  res.on("close", () => {
    console.log("client dropped me");
    pgClient.end();
    res.end();
  });
}

export default router;
