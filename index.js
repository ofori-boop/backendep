const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "epussd.cankoz9ihj2m.us-west-1.rds.amazonaws.com",
  user: "EpDev1",
  password: "moneymoney101",
  database: "ep_foundation",
});

app.get("/", (req, res) => {
  res.json("hello this the backend");
});
app.get("/dues", (req, res) => {
  const q = "SELECT * FROM dues";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/dues/search/:id", (req, res) => {
  const clientId = req.params.id;
  const q = "SELECT * FROM dues WHERE name = ?";
  db.query(q, [clientId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/trans/search/:id", (req, res) => {
  const clientId = req.params.id;
  const q = "SELECT * FROM payment_transactions WHERE resource_id = ?";
  db.query(q, [clientId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  const q =
    "SELECT * FROM login_credentials WHERE `username` = ? AND `password` = ?";
  db.query(q, [username, password], (err, data) => {
    if (err) return res.json(err);

    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json(null);
    }
  });
});
app.post("/dues", (req, res) => {
  const q =
    "INSERT INTO dues (`name`,`phone_number`,`balance`,`date`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.phone_number,
    req.body.balance,
    req.body.date,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Data succesfully created");
  });
});

app.delete("/dues/:id", (req, res) => {
  const clientId = req.params.id;
  const q = "DELETE FROM dues WHERE id = ?";
  db.query(q, [clientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Data has been deleted sucessfully");
  });
});

app.put("/dues/:id", (req, res) => {
  const clientId = req.params.id;
  const q =
    "UPDATE dues SET `name` = ?, `phone_number` = ?, `balance` = ?, `date` = ? WHERE id = ?";
  const values = [
    req.body.name,
    req.body.phone_number,
    req.body.balance,
    req.body.date,
  ];

  db.query(q, [...values, clientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been updated sucessfully");
  });
});

app.listen(8800, () => {
  console.log("connnected to backend");
});
