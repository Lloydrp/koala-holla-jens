const pg = require("pg");

const pool = pg.Pool({
  database: "koala_holla",
  host: "localhost",
  port: "5432",
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on("connect", () => {
  console.log("Postgres Connected!");
});

pool.on("error", (error) => {
  console.log("Error in Postgres Connection", error);
});

module.exports = pool;
