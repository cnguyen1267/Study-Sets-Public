const express = require("express");
const cors = require("cors");
// const pg = require("pg");

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "laptops21",
    host: "localhost",
    port: 5432,
    database: "flashcards",
});

// setup application to handle requests
const app = express();

// if server ever recives json, it can handle it and req.body won't be undefined
app.use(express.json());

// allows cross origin communication from client to server
app.use(cors());

// get a group
app.get("/group/:id", (req, res) => {
    // select flashcards from groupid
    const query = `SELECT * FROM flashcards WHERE groupid = ${req.params.id}`;

    pool.query(query, (err, qryRes) => {
        if (err || qryRes.rows.length === 0) {
            console.log("Error");
            res.status(404).json({ error: "no group id" });
        } else {
            console.log("good");
            // return all flashcards
            res.json(qryRes.rows);
        }
    });
});

// make a group
app.post("/createGroup/", (req, res) => {
    const grpQry = `
        INSERT INTO Groups DEFAULT VALUES RETURNING id;
    `;

    // get data to add to table
    flashcards = req.body;

    // make a group
    pool.query(grpQry, (err, qryRes) => {
        if (err) {
            console.log("Error");
            res.status(404).json({ error: "couldn't create group" });
        } else {

            groupId = qryRes.rows[0].id;

            isErr = false;

            // add all flash cards to group
            flashcards.forEach((flashcard) => {
                const addFlashCardQry = `INSERT INTO Flashcards (front, back, groupId)
                    VALUES ('${flashcard.front}', '${flashcard.back}', ${groupId})`;

                pool.query(addFlashCardQry, (err2, qryRes2) => {
                    if (err2) {
                        isErr = true;
                    } else {
                        // dont care
                    }
                });
            });

            if (isErr) {
                console.log("Error");
                res.status(404).json({
                    error: "couldn't create flashcard",
                });
            } else {
                res.status(200).json({
                    success: "success",
                });
            }
        }
    });
});

// add or remove a flashcard
// app.post();

// start up server on port 4000
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
