const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const fetchuser = require('../middleware/fetchtoken');
var jwt = require("jsonwebtoken");
const JWT_SECRET = 'j@shan';

// signup endpoints

router.post(
  "/signup",
  body("email", "Enter a vaild email").isEmail(),
  body("password", "password should be atleast 5 length").isLength({ min: 5 }),
  body("name", "name min 3 length").isLength({ min: 3 }),
  async (req, res) => {
    try {

      // checking user input fileds

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).json({ ValidationErrors: errors.array() , "error":"True" , "msg":"Syntax error" });
      }

      // checking user allready exist or not

      const finduserexist = await User.findOne({ email: req.body.email });
      if (finduserexist) {
        return res.status(409).json({"error":"Ture","msg":"sorry user with this email already exist" });
      }

      // hashing password

      await bcrypt.genSalt(10, async function (err, salt) {
        await bcrypt.hash(req.body.password, salt, async function (_err, hash) {
          // Store hash in your password DB.
          const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
          });

          // create token for a user

          const data = {
            user: {
              id: user.id,
            },
          };
          const token = jwt.sign(data, JWT_SECRET);
          res.json({ "error" : "false" , token });
        });
      });
    } catch (error) {
      return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
    }
  }
);


// login endpoints

router.post(
  "/login",
  body("email", "Enter a vaild email").isEmail(),
  body("password", "password should be atleast 5 length").isLength({ min: 5 }),
  async (req, res) => {
    try {

      // checking user input fileds

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).json({ ValidationErrors: errors.array() , "error":"True" , "msg":"Syntax error" });
      }

      // checking user exist or not

      const { email, password } = req.body;

      const Userinfo = await User.findOne({ email });
      if (!Userinfo) {
        return res.status(403).json({"error":"Ture","msg":"sorry user with this email can't exist" });
      }

      //  checking password

      const match = await bcrypt.compare( password, Userinfo.password);
          if (!match) {
            return res.status(403).json({"error":"Ture","msg":"password incorrect" });
          }

      // create token for a user

      const data = {
        Userinfo: {
          id: Userinfo.id
        }
      };
      const token = jwt.sign(data, JWT_SECRET);
      res.json({ "error" : "false" , token });
    } catch (error) {
      return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
    }
  }
);


// let user loged in authication  

router.get("/authication", fetchuser , async (req, res) => {
    try {
      const userid = req.data.Userinfo.id
      const user = await User.findOne({_id:userid}).select("-password")
      res.json({ "error" : "false" , user })

    } catch (error) {
      return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
    }


  });



module.exports = router;
