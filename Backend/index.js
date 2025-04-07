const express = require("express");
const chats = require("./data/dummydata");
const app = express();

const dotenv=require("dotenv")
dotenv.config()

const cors = require("cors");
app.use(cors());


app.get("/api/chat", (req, res) => {
  console.log("request");
  
  res.json(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singlechat = chats.find((c) => {
    return c._id == req.params.id;
  });

  res.send(singlechat);
  res.send(chats);
});

app.listen(process.env.PORT, () => {
    console.log("Listening 3000");
  });
