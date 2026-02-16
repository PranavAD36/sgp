const express = require("express");
const router = express.Router();

const { getStudentAttendanceSummary } = require("../controllers/studentSummary_controller.js");

// /api/student/:studentId/summary
router.get("/:studentId/summary", getStudentAttendanceSummary);

module.exports = router;
