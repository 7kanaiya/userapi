let express = require("express");
let Joi = require("@hapi/joi");
let bcrypt = require("bcrypt");
let router = express.Router();
let model = require("../db/user");
let usermiddleware = require("../middleware/user");

//all users
router.get("/allusers", usermiddleware, async (req, res) => {
  let users = await model.find();
  res.send({ data: users });
});

//users by id
router.get("/user/:id", async (req, res) => {
  let user = await model.findById(req.params.id);
  if (!user) {
    return res.status(404).send({ message: "Invalid user ID" });
  }
  res.send({ data: user });
});

router.post("/user/newuser", async (req, res) => {
  let user = await model.findOne({
    "UserLogin.UserName": req.body.UserLogin.UserName,
  });
  if (user) {
    return res.status(403).send({ message: "user already exists" });
  }
  let { error } = ValidationError(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  let newData = new model({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Address: req.body.Address,
    EmailId: req.body.EmailId,
    MobileNo: req.body.MobileNo,
    UserLogin: req.body.UserLogin,
  });

  let salt = await bcrypt.genSalt(10);
  newData.UserLogin.Password = await bcrypt.hash(
    newData.UserLogin.Password,
    salt
  );
  let token = user.JwtToken();
  let data = await newData.save();
  res
    .header("x-auth-token", token)
    .send({ message: "registered successfully", d: data, t: token });
});
function ValidationError(error) {
  let Schema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    Address: Joi.string().required(),
    EmailId: Joi.string().required().email(),
    MobileNo: Joi.number().required(),
    UserLogin: {
      UserName: Joi.string().required(),
      Password: Joi.string().required(),
    },
  });
  return Schema.validate(error);
}
module.exports = router;
