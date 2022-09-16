const express = require("express");
const koalaRouter = express.Router();
// DB CONNECTION
const pool = require("../modules/pool");

// GET
koalaRouter.get("/", (req, res) => {
  console.log("in GET koalas");
  const queryText = `SELECT * from "koalas";`;

  pool
    .query(queryText)
    .then((result) => {
      console.log("Sucessful SELECT from database");
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error SELECT from 'koalas'", error);
      res.send(505);
    });
});

// POST

koalaRouter.post("/", (req, res) => {
  const { name, age, gender, notes } = req.body;
  const ready_to_transfer = req.body.readyForTransfer;
  const queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ($1, $2, $3, $4, $5)`

console.log( name, age, gender, notes  );

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

koalaRouter.put("/readytoggle/:koalaid", (req, res) => {
  const koalaid = req.params.koalaid;
  const queryText = `UPDATE "koalas" SET "ready_to_transfer"=(NOT "ready_to_transfer") WHERE "id" = $1 RETURNING *;`;

  pool
    .query(queryText, [koalaid])
    .then(() => {
      console.log("Updating ready to transfer for:", koalaid);
      res.sendStatus(202);
    })
    .catch((error) => {
      console.log("error in koala put :>> ", error);
      res.sendStatus(500);
    });
});

// DELETE
koalaRouter.delete('/:koalaid', (req, res) =>{
    console.log('req.params.koalaid is:', req.params.koalaid);
    const koalaId = req.params.koalaid;
    const queryText = `DELETE FROM "koalas" WHERE "id" = $1;`
    
    pool.query(queryText, [koalaId])
    .then( () => {
        console.log("Deleted Koala is:", koalaId);
        res.sendStatus(204);
    }).catch((error) => {
        console.log("Error DELETING from 'koalas'", error);
        res.send(500);
    });
    ;
})

module.exports = koalaRouter;
