
const express = require("express");
const koalaRouter = express.Router();
const pool = require("../modules/pool");

// DB CONNECTION

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

// PUT

// DELETE

module.exports = koalaRouter;
