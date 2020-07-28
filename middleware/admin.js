function Admin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send({ message: "User not authorised" });
  }
  next();
}
module.exports = Admin;
