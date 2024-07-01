// ?
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "laptops21",
  host: "localhost",
  port: 5432,
  database: "flashcards",
});

// create database

// create tables
const createGrpTblQry = `
    CREATE TABLE Groups (
        id SERIAL PRIMARY KEY
    );
`;

const createFlashCardTblQry = `
    CREATE TABLE Flashcards (
        id SERIAL PRIMARY KEY,
        front VARCHAR(50) NOT NULL,
        back VARCHAR(50) NOT NULL,
        groupId INT,
        FOREIGN KEY (groupId) REFERENCES Groups(id)
    );`;

/*
pool.query("CREATE DATABASE flashcards;", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database created successfully");
    console.log(res);
  }
});
*/

pool.query(createGrpTblQry, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Groups table created successfully");

    pool.query(createFlashCardTblQry, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Flash Cards table created successfully");
      }
    });
  }
});

module.exports = pool;
