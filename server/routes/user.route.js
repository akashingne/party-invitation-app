const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authUser = require("../middleware/auth.user");

router.post("/auth/signin", async (req, res) => {
  User.findOne({ email: req.body.user.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "User does not existes" });
      }
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, (err, result) => {
          if (!result) {
            return res
              .status(200)
              .json({ success: false, message: "Invalid credentials" });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                id: user._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );

            return res.status(200).json({
              success: true,
              token: token,
              user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
              message: "Auth Success",
            });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(200).json({ success: false, message: err });
    });
});

router.post("/auth/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body.user;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" });
  } else {
    User.findOne({ email: email })
      .exec()
      .then((data) => {
        if (data) {
          return res
            .status(200)
            .json({ success: false, message: "User already exists" });
        }
        if (!data) {
          bcrypt
            .hash(password, 10)
            .then((hash) => {
              const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  const token = jwt.sign(
                    {
                      email: user.email,
                      id: user._id,
                    },
                    process.env.JWT_KEY,
                    {
                      expiresIn: "1h",
                    }
                  );
                  res.json({
                    success: true,
                    token: token,
                    user: {
                      id: result._id,
                      firstName: result.firstName,
                      lastName: result.lastName,
                      email: result.email,
                    },
                    message: "User registered successfully",
                  });
                })
                .catch((err) => {
                  res.json({ success: false, message: "Auth Failed" });
                });
            })
            .catch((err) => {
              res.json({ success: false, message: err });
            });
        }
      });
  }
});

router.get("/", authUser, (req, res) => {
  // console.log(req.user);
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json({ success: true, user }));
});

module.exports = router;
