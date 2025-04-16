const express = require("express");
const chats = require("./data/dummydata");
const connectDB=require("./database/dbcon");
const userRoutes=require("./routes/userRoutes")

const app = express();


const dotenv=require("dotenv")
dotenv.config()

const cors = require("cors");
app.use(cors());
app.use(express.json());


app.use("/api/user", userRoutes); 


connectDB();

app.get("/api/chat", (req, res) => {
  console.log("request");
  
  res.json(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singlechat = chats.find((c) => {
    return c._id == req.params.id;
  });

  res.send(singlechat);
});

app.listen(process.env.PORT, () => {
    console.log("Listening 3000");
  });
