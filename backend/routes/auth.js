const express = require("express");
const router = express.Router();

const {
  adminLogin,
  addStudent,
  addFaculty,
  studentLogin,
  facultyLogin,
  changePassword,
  resetPassword
} = require("../controllers/auth_controller");

router.post("/admin-login", adminLogin);
router.post("/add-student", addStudent);
router.post("/add-faculty", addFaculty);
router.post("/student-login", studentLogin);
router.post("/faculty-login", facultyLogin);
router.post("/change-password", changePassword);
router.post("/reset-password", resetPassword);

module.exports = router;
