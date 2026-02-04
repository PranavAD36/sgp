const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance
} = require("../controllers/attendance_controller");

// MARK ATTENDANCE
router.post("/mark", markAttendance);

// GET ATTENDANCE
router.get("/:studentId", getAttendance);

module.exports = router;
