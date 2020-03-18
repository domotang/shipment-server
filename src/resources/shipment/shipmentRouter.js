import express from "express";
require("dotenv").config();

var pgp = require("pg-promise")(/* options */);
var db = pgp(process.env.DB_CONNECT_STRING);

var router = express.Router();

function getList(req, res) {
  db.any("select * from sh_wapi_list_select()", [])
    .then(function(data) {
      res.send(data);
    })
    .catch(function(error) {
      console.log("ERROR:", error);
    });
}

function getHeader(req, res) {
  db.one("select * from sh_wapi_select() where _id = $1", [req.params.id])
    .then(function(data) {
      res.send(data);
    })
    .catch(function(error) {
      console.log("ERROR:", error);
    });
}

router.route("/").get(getList);
router.get("/io", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
router.route("/:id").get(getHeader);

export default router;
