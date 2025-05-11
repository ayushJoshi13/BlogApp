import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import middleware from "../middlewares/middlewares.js";

//instance of Router
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({email});
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "user already exist" });
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error is Adding User" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const {  email, password } = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user Does Not exist" });
    }

    const checkPassword = await bcrypt.compare(password,user.password)

    if(!checkPassword){
      return res.status(401).json({success:false, message:"wrong credentials"})
    }

   const token = jwt.sign({id:user._id}, "secretKeyofnoteapp123@#", {expiresIn:"5h"})

    return res
      .status(200)
      .json({ success: true, token ,user:{name: user.name} ,message: "Login successfully" });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Error in Logging User" });
  }
});

router.get('/verify', middleware , async (req,res)=>{
  return res
  .status(200)
  .json({ success: true, user : req.user});
})

export default router;
