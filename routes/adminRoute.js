const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying users account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctors account",
      success: false,
      error,
    });
  }
});

router.post("/change-doctor-status", authMiddleware, async (req, res) => {
  try {
    const { doctorId, status, userId } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      status,
    });

    const user = await User.findOne({ _id: doctor.userId });

    const unseenNotification = user.unseenNotification;
    unseenNotification.push({
      type: "new-doctor-request-changed",
      message: `Your doctor account has been ${status}`,
      onClickPath: "/notifications",
    });
    user.isDoctor = status === "approved" ? true : flase;
    await user.save();
    res.status(200).send({
      message: "Doctors status updated successFully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctors account",
      success: false,
      error,
    });
  }
});

module.exports = router;
