const express = require("express");
const koalaRouter = express.Router();
// DB CONNECTION
const pool = require("../modules/pool");

// GET
koalaRouter.get('/', (req, res) => {
    console.log('in GET koalas');
    const queryText = `SELECT * from "koalas";`

    pool.query(queryText)
    .then((result) => {
        console.log('Sucessful SELECT from database');
        res.send(result.rows);
    }).catch((error) => {
        console.log("Error SELECT from 'koalas'", error);
        res.send(505);
    });
});


// POST

koalaRouter.post("/", (req, res) => {
  const { name, age, gender, notes } = req.body;
  const ready_to_transfer = req.body.readyForTransfer;
  const queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ($1, $2, $3, $4, $5)`;

  pool
    .query(queryText, [name, gender, age, ready_to_transfer, notes])
    .then(() => {
      console.log("Creating koala");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in creating koala :>> ", error);
      res.sendStatus(500);
    });
});

// PUT

// DELETE

module.exports = koalaRouter;
