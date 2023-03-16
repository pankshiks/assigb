require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(token);
    jwt.verify(token, process.env.SECRET_TOKEN, (err, encoded) => {
      if (err) {
        return res.send("invalid Token");
      } else {
        req.user = encoded;
        next();
      }
    });
  } catch (error) {
    return res.send("Token Required");
  }
};
