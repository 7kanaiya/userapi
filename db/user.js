let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let config = require("config");

let userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Address: { type: String, required: true },
  EmailId: { type: String, required: true, unique: true },
  MobileNo: { type: Number, required: true },
  UserLogin: {
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
  },
});
userSchema.methods.JwtToken = function () {
  let token = jwt.sign(
    { _id: this.id, FirstName: this.FirstName },
    config.get("ENV_PASSWORD")
  );
  return token;
};
let userModel = mongoose.model("userdetails", userSchema);

module.exports = userModel;
