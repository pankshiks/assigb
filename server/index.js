require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const usersRouter = require("./api/routes/userRoute");
const app = express();
var corsOptions = {
  origin: "*",
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/", usersRouter);
mongoose.connect(process.env.DB_URL);
console.log("server connected");
app.listen(process.env.PORT || 3005);
