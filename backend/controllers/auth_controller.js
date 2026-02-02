const Student = require("../models/student");
const Faculty = require("../models/faculty");
const Admin = require("../models/admin");

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  const { adminId, password } = req.body;
  const admin = await Admin.findOne({ adminId });

  if (!admin || admin.password !== password)
    return res.json({ message: "Invalid Admin" });

  res.json({ message: "Admin Login Success" });
};

// ADD STUDENT
exports.addStudent = async (req, res) => {
  const { studentId, name, birthdate } = req.body;

  const newStudent = new Student({
    studentId,
    name,
    password: birthdate
  });

  await newStudent.save();
  res.json({ message: "Student Added" });
};

// ADD FACULTY
exports.addFaculty = async (req, res) => {
  const { facultyId, name, password } = req.body;

  const newFaculty = new Faculty({
    facultyId,
    name,
    password
  });

  await newFaculty.save();
  res.json({ message: "Faculty Added" });
};

// STUDENT LOGIN
exports.studentLogin = async (req, res) => {
  const { studentId, password } = req.body;
  const student = await Student.findOne({ studentId });

  if (!student || student.password !== password)
    return res.json({ message: "Invalid Student" });

  res.json({ message: "Login Success", student });
};

// FACULTY LOGIN
exports.facultyLogin = async (req, res) => {
  const { facultyId, password } = req.body;
  const faculty = await Faculty.findOne({ facultyId });

  if (!faculty || faculty.password !== password)
    return res.json({ message: "Invalid Faculty" });

  res.json({ message: "Login Success", faculty });
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  const { id, newPassword, role } = req.body;

  if (role === "student")
    await Student.updateOne({ studentId: id }, { password: newPassword });

  if (role === "faculty")
    await Faculty.updateOne({ facultyId: id }, { password: newPassword });

  res.json({ message: "Password Updated" });
};

// RESET PASSWORD (FORGET)
exports.resetPassword = async (req, res) => {
  const { studentId, birthdate } = req.body;

  await Student.updateOne(
    { studentId },
    { password: birthdate }
  );

  res.json({ message: "Password Reset" });
};
