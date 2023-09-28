const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const userRouter = Router();

userRouter.post("/api/register", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "user Already registered" });
    } else {
      bcrypt.hash(req.body.password, 10, async (error, hash) => {
        if (hash) {
          const newUser = new UserModel({
            ...req.body,
            password: hash,
          });
          await newUser.save();
          res.status(200).json({ msg: "User registered successfuly" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/api/login", async(req, res)=>{
    const {email, password} = req.body;
try {
    const user = await UserModel.findOne({ email });
    if(user){
        bcrypt.compare(password, user.password, (error, result)=>{
            if(result){
                let token = jwt.sign({userID: user._id}, "kamran");
                res.status(200).json({msg: "user logged in success", token})
            }
            else{
                res.status(200).json({msg: "incorrect Password"})
            }
        })
    }
} catch (error) {
    res.status(400).json({ error: error.message });
}
})


module.exports = {userRouter};