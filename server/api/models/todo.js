const mongoose = require("mongoose");
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    data: String,
    created_by: { type: mongoose.Schema.ObjectId, ref: "User" },
  })
);
module.exports = Todo;
