require("dotenv").config();
const User = require("../models/user");
const Todo = require("../models/todo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  console.log(user);
  if (user) {
    let passwordIsValid = bcrypt.compareSync(password, user.password);
    if (passwordIsValid) {
      return res.send({
        success: true,
        message: "User Login Succesful",
        data: user,
      });
    }
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);

    const token = jwt.sign(req.body, process.env.SECRET_TOKEN, {
      expiresIn: "30m",
    });

    data = {
      email,
      password: hashedPassword,
      auth_token: token,
    };
    let user = await User.create(data);
    res.send({
      success: true,
      message: "User Login Succesful",
      data: user,
    });
  }
};

exports.addTodo = async (req, res) => {
  const { data } = req.body;
  console.log(req.body.data);
  let result = await Todo.create({ data });
  return res.send({
    success: true,
    message: "TodoCreted Succesful",
    data: result,
  });
};
exports.fetchTodo = async (req, res) => {
  let result = await Todo.find({});
  res.send({
    success: true,
    message: "All Todos",
    data: result,
  });
};

exports.deleteTodo = async (req, res) => {
  let result = await Todo.findByIdAndDelete({ _id: req.body._id });

  res.send({
    success: true,
    message: "Todo Deleted sucessfully",
  });
};

exports.updateTodo = async (req, res) => {
  const { data } = req.body;

  let result = await Todo.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { data: data } }
  );

  res.send({
    success: true,
    message: "Todo Deleted sucessfully",
  });
};
