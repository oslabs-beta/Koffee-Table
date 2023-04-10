const express = require("express");
const path = require("path");
const producerController= require('../kafka/producer')

const app = express();
app.use(express.json());


//serve main page of application
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/index.html"));
})
app.use("/build", express.static(path.resolve(__dirname, "../build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"), err => {
    if(err){
      console.log(err);
    }
  })
})



app.post("/", producerController.addMsg, (req, res) => {
  return res.sendStatus(200);
});

app.listen(3000, () => console.log("listening to 3000"));