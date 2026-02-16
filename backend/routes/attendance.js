const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getSummary
} = require("../controllers/attendance_controller");

// MARK
router.post("/mark", markAttendance);

// SUMMARY (ALWAYS FIRST)
router.get("/summary/:studentId", getSummary);

// RAW ATTENDANCE
router.get("/:studentId", getAttendance);

module.exports = router;
