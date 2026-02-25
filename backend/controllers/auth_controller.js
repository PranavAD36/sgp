const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");

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
  try {
    const { studentId, name, email, password } = req.body;

    const newStudent = new Student({
      studentId,
      name,
      email,
      password
    });

    await newStudent.save();
    res.json({ message: "Student Added Successfully" });

  } catch (err) {
    res.json({ message: "Error Adding Student" });
  }
};


// ADD FACULTY
exports.addFaculty = async (req, res) => {
  try {
    const { facultyId, name, email, password } = req.body;

    const newFaculty = new Faculty({
      facultyId,
      name,
      email,
      password
    });

    await newFaculty.save();
    res.json({ message: "Faculty Added Successfully" });

  } catch (err) {
    res.json({ message: "Error Adding Faculty" });
  }
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
