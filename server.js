const express = require("express");
const path = require("path");
const producerController= require('./producer')
const producerController2= require('./producer')


const app = express();
app.use(express.json());

app.get("/", (req, res) => 
    res.sendFile(path.resolve(__dirname, "someFrontEndStuff/index.html"))
);

app.use(express.static(path.resolve(__dirname, "someFrontEndStuff/js")));

app.post("/", producerController.addMsg, (req, res) => {

  console.log('here')
  return res.sendStatus(200);
});

app.listen(3000, () => console.log("listening to 3000"));