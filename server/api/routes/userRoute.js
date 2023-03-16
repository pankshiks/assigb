const express = require("express");
const {
  login,
  addTodo,
  fetchTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/user.controller");
const { auth } = require("../auth/auth");
const router = express.Router();

// const { mong} = require("../models/user.js");
router.get("/test", auth, (req, res) => {
  res.send("Test");
});

router.post("/login", login);
router.post("/addData", auth, addTodo);
router.get("/fetchData", auth, fetchTodo);
router.post("/deleteData", auth, deleteTodo);
router.post("/updateTodo", auth, updateTodo);

module.exports = router;
