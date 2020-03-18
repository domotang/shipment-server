var pgp = require("pg-promise")(/* options */);

var db = pgp(process.env.DB_CONNECT_STRING);

export default db;
