const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance
} = require("../controllers/attendance_controller");

router.post("/mark", markAttendance);
router.get("/:studentId", getAttendance);

module.exports = router;
