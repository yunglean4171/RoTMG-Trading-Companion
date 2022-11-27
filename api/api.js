const mysql = require('mysql')
const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const app = express()

const port = 60

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rotmgtb'
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

app.get('/get/all', (req, res) => {
  connection.query('SELECT * FROM tradeoffers', (err, result) => {
    if (err) throw err
    else res.send(result)
  })
})

app.get('/get/id/:id', (req, res) => {
  connection.query('SELECT * FROM tradeoffers WHERE ID = ' + req.params.id, (err, result) => {
    if (err) throw err
    else res.send(result)
  })
})

app.get('/get/dcid/:dcid', (req, res) => {
  connection.query('SELECT * FROM tradeoffers WHERE DCID = ' + req.params.dcid, (err, result) => {
    if (err) throw err
    else res.send(result)
  })
})

app.post('/post', (req, res) => {
  connection.query(`INSERT INTO tradeoffers (DCID, DCNAME, CATEGORY, IGN, ITEM1, Q1, ITEM2, Q2) VALUES ("${req.body.dcid}", "${req.body.dcname}", "${req.body.category}", "${req.body.ign}","${req.body.item1}", "${req.body.q1}", "${req.body.item2}", "${req.body.q2}");`, (err, result) => {
    if (err) throw err
    else res.send(result)
  })
})

app.put('/put', (req, res) => {
  connection.query(`UPDATE tradeoffers SET MESSAGEID = "${req.body.mid}", CHANNELID = "${req.body.cid}" WHERE ID = "${req.body.id}";`, (err, result) => {
    if (err) throw err
    else res.send(result)
  })
})

app.delete('/del/:id', (req, res) => {
  connection.query(`DELETE FROM tradeoffers WHERE ID = ${req.params.id}`, (err, result) => {
    if (err) throw err
    else res.send(result)
  })
})

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})