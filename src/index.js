require("dotenv").config();
const dbUrl = process.env.MONGO_CONNECTION_URL;
const PORT = process.env.PORT;
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
//conexão com banco de dados mongo db
mongoose
  .connect(dbUrl)
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
