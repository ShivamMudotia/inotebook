const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

//const JWT_SECRET = .process.env.JWT_TOKEN
//console.log(JWT_SECRET)

JWT_SECRET = "Thisisa$ecretJWTToken";

// ROUTE 1 - create a user using POST - "/api/post/createuser" , no auth needed.

router.post(
  "/createuser",
  [
    body("email", "Enter a Valid email").isEmail(),
    body("name", "Enter a valid Name").isLength({ min: 5 }),
    body("password", "Enter a Valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are validation errors, return bad request and the error(s)
    const errors = validationResult(req);
    let success = false

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if a user with supplied email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false
        return res
          .status(400)
          .json({ success, errors: "A user ith this email is  already registered" });
      }

      const salt = await bcrypt.genSalt(10);

      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      data = { 
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2  - Authenticate a user using POST and get auth-token as response- "/api/post/login"

router.post(
  "/login",
  [
    body("email", "Enter a Valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are validation errors, return bad request and the error(s)
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ success,
          Error:
            "Incorrect Credentials. Please Recheck and try with correct credentials ! ",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success,
          Error:
            "Incorrect Credentials. Please Recheck and try with correct credentials ! ",
        });
      }

      data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 - Get Logged in user details using POST - "/api/post/getuser" , Logged in needed.

router.get("/getuser", fetchuser, async (req, res) => {
  let success = false
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true
    res.send(success, user);
  } catch (error) {
    console.error(error.message);
    success = false
    res.status(500).send(success, "Internal Server Error");
  }
});

module.exports = router;
