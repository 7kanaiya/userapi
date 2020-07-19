let jwt = require("jsonwebtoken");
let config = require("config");
function User(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "Access Denied" });
  }
  try {
    let dcoded = jwt.verify(token, config.get("ENV_PASSWORD"));
    req.user = dcoded;
    next();
  } catch (ex) {
    return res.status(403).send({ message: "Invalid Token" });
  }
}
module.exports = User;
