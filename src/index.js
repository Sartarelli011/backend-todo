require("dotenv").config();
const dbUrl = process.env.MONGO_CONNECTION_URL;
const PORT = process.env.PORT;
const cors = require("cors");

const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");
const mongoose = require("mongoose");

//conexão com banco de dados mongo db
mongoose.set("strictQuery", true);
mongoose
  .connect(dbUrl)
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());

//rotas de cadastro e login
app.use("/user", userRouter);
//rotas do todoForm get,post,put,delete
app.use("/api", todoRouter);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
