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

// add or remove a flashcard
app.post("/deleteFlashcard/:id", async (req, res) => {
    try {
        const query = `DELETE FROM flashcards WHERE id = ($1)`;

        qryResult = await pool.query(query, [req.params.id]);

        console.error("Success");
        res.status(200).json({ status: "Success", error: null });
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({
            status: "Error",
            error: "Couldn't edit flashcard",
        });
    }
});

app.post("/updateFlashcard/:id", async (req, res) => {
    try {
        const query = `UPDATE flashcards SET front = ($1), back = ($2) WHERE id = ($3)`;

        qryResult = await pool.query(query, [
            req.body.front,
            req.body.back,
            req.params.id,
        ]);

        console.error("Success");
        res.status(200).json({ status: "Success", error: null });
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({
            status: "Error",
            error: "Couldn't edit flashcard",
        });
    }
});

// get a set
app.get("/set/:id", async (req, res) => {
    try {
        const query = `SELECT * FROM flashcards WHERE set_id = ($1)`;
        const qryResult = await pool.query(query, [req.params.id]);
        if (qryResult?.rows?.length === 0) {
            throw new Error("Couldn't find set");
        }
        res.status(200).json({
            status: "Success",
            error: null,
            data: qryResult.rows, // array
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({
            status: "Error",
            error: "Couldn't get set of flashcards",
        });
    }
});

// make a set
app.post("/createSet/", async (req, res) => {
    try {
        // Create the set
        const grpQry = `
            INSERT INTO Sets (set_name) VALUES ($1) RETURNING id;
        `;

        // get the id of the set created
        const { rows } = await pool.query(grpQry, [req.body.set_name]);
        const set_id = rows[0].id;

        // Add all flashcards to the set using set_id
        const flashcards = req.body.flashcards;
        const addFlashCardPromises = flashcards.map((flashcard) => {
            const addFlashCardQry = `
                INSERT INTO Flashcards (front, back, set_id)
                VALUES ($1, $2, $3)
            `;
            return pool.query(addFlashCardQry, [
                flashcard.front,
                flashcard.back,
                set_id,
            ]);
        });

        //this line makes sure that all promises are fulfilled in that variable
        await Promise.all(addFlashCardPromises);

        res.status(200).json({ status: "Success", error: null, data: set_id});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({
            status: "Error",
            error: "Couldn't create set or flashcards",
        });
    }
});

// start up server on port 4000
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
