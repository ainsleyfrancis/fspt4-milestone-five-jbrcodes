var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// GET student list
router.get("/", function(req, res, next) {
  db("SELECT * FROM students;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one student
router.get("/:id", async (req, res, next) => {
  //your code here
  let id = req.params.id;

  try {
    let sql = `SELECT * FROM students WHERE id = ${id}`;
    let results = await db(sql);
    if (results.data.length === 1) {
      res.send(results.data[0]);
    } else {
      res.status(404).send({ error: "Not Found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new student into the DB
router.post("/", function(req, res, next) {
  //your code here

  let { firstname, lastname } = req.body;

  let sql = `
  INSERT INTO students (firstname, lastname)
  VALUES ('${firstname}', '${lastname}')
  `;

  db(sql)
    .then(results => {
      db("select * from students").then(results => {
        res.status(201).send(results.data);
      });
    })
    .catch(err => res.status(500).send({ error: err.message }));
});

// DELETE a student from the DB
router.delete("/:id", function(req, res, next) {
  //your code here

  let id = req.params.id;

  let sql = `DELETE FROM students WHERE id = ${id}`;

  db(sql)
    .then(results => {
      db("SELECT * FROM students").then(results => {
        res.status(201).send(results.data);
      });
    })
    .catch(err => res.status(500).send({ error: err.message }));
});

module.exports = router;
