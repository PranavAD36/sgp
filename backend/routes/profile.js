const express = require("express");
const router = express.Router();

const {
  getStudentProfile,
  getFacultyProfile,
  getAdminProfile
} = require("../controllers/profile_controller.js");

router.get("/student/:studentId", getStudentProfile);
router.get("/faculty/:facultyId", getFacultyProfile);
router.get("/admin/:adminId", getAdminProfile);

module.exports = router;