let mongoose = require("mongoose");

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

let userModel = mongoose.model("userdetails", userSchema);

module.exports = userModel;
