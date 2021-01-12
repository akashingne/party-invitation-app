const express = require("express");
const router = express.Router();
const Guest = require("../models/guest.model");
const authUser = require("../middleware/auth.user");

router.get("/", authUser, (req, res) => {
  Guest.find({ userId: req.user.id })
    .exec()
    .then((result) => {
      if (result) {
        return res.json({
          success: true,
          guests: result,
          message: "Guests found",
        });
      }
    })
    .catch((err) => {
      res.json({ success: false, message: "No guest found" });
    });
});

router.post("/", authUser, (req, res) => {
  const { name, mobile, dietary } = req.body.guest;
  if (!name || !mobile || !dietary || !req.user.id) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" });
  } else {
    const guest = new Guest({
      name,
      mobile,
      dietary,
      userId: req.user.id,
    });
    guest
      .save()
      .then((result) => {
        res.json({ success: true, guest: result, message: "Guest is created" });
      })
      .catch((err) => {
        res.json({ success: false, message: err });
      });
  }
});

router.put("/confirmation/:id", authUser, (req, res) => {
  Guest.find({ userId: req.user.id })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status({ success: false, message: "No guest found" });
      }
      if (result) {
        Guest.findById(req.params.id).then((guest) => {
          console.log(guest);
          Guest.findOneAndUpdate(
            { _id: guest.id },
            { isConfirm: !guest.isConfirm }
          ).then((response) => {
            if (response) {
              return res.json({ success: true, message: "Guest updated" });
            }
          });
        });
      }
    });
});

router.patch("/:id", authUser, (req, res) => {
  console.log(req.body);
  Guest.find({ userId: req.user.id })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status({ success: false, message: "No guest found" });
      } else {
        Guest.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body.guest,
          },
          (err, result) => {
            // console.log(result);
            if (err) {
              return res.json({
                success: false,
                message: "Something went wrong",
              });
            }
            res.json({ success: true, message: "Guest updated successfully" });
          }
        );
      }
    });
});

router.delete("/:id", authUser, (req, res) => {
  Guest.find({ userId: req.user.id })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status({ success: false, message: "No guest found" });
      } else {
        Guest.findByIdAndRemove(req.params.id, (err, result) => {
          if (err) {
            return res.json({
              success: false,
              message: "Something went wrong",
            });
          }
          res.json({ success: true, message: "Guest deleted successfully" });
        });
      }
    });
});

module.exports = router;
