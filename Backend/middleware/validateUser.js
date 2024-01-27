const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateUser = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not Authorized");
      }
      req.user = decode.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("User is not Authorized or token is missing");
  }
});

module.exports = validateUser;
