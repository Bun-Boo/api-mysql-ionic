import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
});
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("wellcome back sir!");
});

app.get("/students", (req, res) => {
  const query = "SELECT * FROM students";
  db.query(query, (err, data) => {
    if (err) return res.status(404).json("error");
    return res.status(200).json(data);
  });
});

//search by Name
app.get("/students/search/", (req, res) => {
  const q = req.query.name;
  const query = `SELECT * FROM students WHERE name LIKE '%${q}%' `;
  db.query(query, (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(data);
  });
});

//search by ID
app.get("/students/searchById", (req, res) => {
  const q = req.query.id;
  const query = `SELECT * FROM students WHERE id = ?  `;
  db.query(query, [q], (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(data);
  });
});

//sap xep theo diem giam dan
app.get("/students/score_desc", (req, res) => {
  const query = `SELECT * FROM students ORDER BY score DESC `;
  db.query(query, (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(data);
  });
});

//sap xep theo diem tang dan
app.get("/students/score_asc", (req, res) => {
  const query = `SELECT * FROM students ORDER BY score ASC `;
  db.query(query, (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(data);
  });
});
app.post("/students/create", (req, res) => {
  const query =
    "INSERT INTO students (`id`, `name`, `address`, `avatar`, `score`) VALUES (?)";
  //   const values = ["2", "Hải", "Thái Bình", "avatar1", "4"];
  const values = [
    req.body.id,
    req.body.name,
    req.body.address,
    req.body.avatar,
    req.body.score,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.status(404).json("error");
    return res.status(200).json("Inserted successfully");
  });
});

app.delete("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const query = "DELETE FROM students WHERE id = ?";
  db.query(query, [studentId], (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json("deleted successfully");
  });
});

app.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const query =
    "UPDATE students SET `name` = ?, `address` = ? , `avatar` = ? , `score` = ? WHERE id = ?  ";
  const values = [
    req.body.name,
    req.body.address,
    req.body.avatar,
    req.body.score,
  ];
  db.query(query, [...values, studentId], (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json("updated successfully");
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("backend connected!");
});
