const express = require("express");
const mysql = require("mysql");

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1200757557",
  database: "nodeMysql",
});

db.connect((err) => {
  if (err) return console.log(err);
  console.log("** DB Conected");
});

app.get("/createDb", (req, res, next) => {
  const sql = "CREATE DATABASE nodeMysql";
  db.query(sql, (err, result) => {
    if (err) return console.log(err);
    console.log(result);
    res.json(result);
  });
});

app.get("/createPostsTable", (req, res, next) => {
  const sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, tittle VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) return console.log(err);
    console.log(result);
    res.json(result);
  });
});
app.get("/addPost", (req, res, next) => {
  let post = {
    tittle: "hi",
    body: "hi man",
  };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, (err, result) => {
    if (err) return console.log(err);
    res.json(result);
  });
});

app.get("/posts", (req, res, next) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, results) => {
    if (err) return console.log(err);
    res.json(results);
  });
});
app.get("/posts/:id", (req, res, next) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) return console.log(err);
    res.json(results);
  });
});
app.get("/posts/:id", (req, res, next) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) return console.log(err);
    res.json(results);
  });
});
app.get("/updatePost/:id", (req, res, next) => {
  let sql = `UPDATE posts  SET tittle = '${"islam mostafa"}' WHERE id = ${
    req.params.id
  }`;
  db.query(sql, (err, results) => {
    if (err) return console.log(err);
    res.json(results);
  });
});
app.listen(5000, () => {
  console.log("**Server is running");
});
