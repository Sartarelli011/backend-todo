const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;
module.exports = function (Request, Response, next) {
  const headerToken = Request.headers["authorization"];
  const token = headerToken && headerToken.split(" ")[1];
  if (token == null) {
    return Response.status(401).send("Access Denied");
  }
  if (!token) {
    return Response.status(401).send("Access Denied");
  }
  try {
    const userVerified = jwt.verify(token, secret);
    Request.user = userVerified;
    next();
  } catch (error) {
    Response.status(401).send("Access Denied");
  }
};
