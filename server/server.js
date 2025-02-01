let express = require("express")
let cors = require("cors");
let sql = require("mysql2");

let app = express();

let uid = 1;

app.use(cors());
app.use(express.json());

let db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "009900red21_2025",
    database: "demo"
})

db.connect((err) => {
    console.log("DB CONNECTED");
})

app.get("/dusers", (req, res) => {
    db.query("SELECT * FROM dusers", (err, result) => {
        res.json(result);
    })
})

app.get("/dorders", (req, res) => {
    db.query("SELECT * FROM dorders", (err, result) => {
        res.json(result);
    })
})

app.post("/dusers", (req, res) => {
    let { id, login, password, fullname, phone, email } = req.body;

    db.query("INSERT INTO dusers VALUES (?, ?, ?, ?, ?, ?)", [id, login, password, fullname, phone, email], (err, result) => {
        res.json({ id: id, login: login, password: password, fullname: fullname, phone: phone, email: email });
    })
})

app.post("/dorders", (req, res) => {
    let { id, userID, type, paytype, date, time, adress, phone } = req.body;

    db.query("INSERT INTO dorders VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, userID, type, paytype, date, time, adress, phone], (err, result) => {
        res.json({ id: id, userID: userID, type: type, paytype: paytype, date: date, time: time, adress: adress, phone: phone });
    })
})


app.listen(5000, () => {
    console.log("LISTEN 5000");
})


/*
CREATE TABLE dusers (
    id INT PRIMARY KEY,
    login VARCHAR(64),
    password VARCHAR(64),
    fullname VARCHAR(64),
    phone VARCHAR(64),
    email VARCHAR(64)
);

CREATE TABLE dorders (
    id INT PRIMARY KEY,
    userID int,
    type VARCHAR(64),
    paytype VARCHAR(64),
    date VARCHAR(64),
    time VARCHAR(64),
    adress VARCHAR(64),
    phone VARCHAR(64)
);
*/