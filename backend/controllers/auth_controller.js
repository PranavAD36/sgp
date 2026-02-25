const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admin = await Admin.findOne({ adminId: adminId?.trim() });
    if (!admin || admin.password !== password) {
      return res.json({ message: "Invalid Admin" });
    }

    return res.json({ message: "Admin Login Success" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ADD STUDENT (NOW WITH EMAIL)
exports.addStudent = async (req, res) => {
  try {
    const { studentId, name, email, birthdate } = req.body;

    if (!studentId || !name || !email || !birthdate) {
      return res.status(400).json({ message: "All fields required" });
    }

    const sid = studentId.trim();
    const sname = name.trim();
    const semail = email.toLowerCase().trim();

    const existingById = await Student.findOne({ studentId: sid });
    if (existingById) {
      return res.status(409).json({ message: "Student ID already exists" });
    }

    const existingByEmail = await Student.findOne({ email: semail });
    if (existingByEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newStudent = new Student({
      studentId: sid,
      name: sname,
      email: semail,
      password: birthdate,
      role: "student"
    });

    await newStudent.save();
    return res.json({ message: "Student Added" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Duplicate Student ID or Email" });
    }
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ADD FACULTY (NOW WITH EMAIL)
exports.addFaculty = async (req, res) => {
  try {
    const { facultyId, name, email, password } = req.body;

    if (!facultyId || !name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const fid = facultyId.trim();
    const fname = name.trim();
    const femail = email.toLowerCase().trim();

    const existingById = await Faculty.findOne({ facultyId: fid });
    if (existingById) {
      return res.status(409).json({ message: "Faculty ID already exists" });
    }

    const existingByEmail = await Faculty.findOne({ email: femail });
    if (existingByEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newFaculty = new Faculty({
      facultyId: fid,
      name: fname,
      email: femail,
      password,
      role: "faculty"
    });

    await newFaculty.save();
    return res.json({ message: "Faculty Added" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Duplicate Faculty ID or Email" });
    }
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// STUDENT LOGIN
exports.studentLogin = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    const student = await Student.findOne({ studentId: studentId?.trim() });
    if (!student || student.password !== password) {
      return res.json({ message: "Invalid Student" });
    }

    return res.json({ message: "Login Success", student });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// FACULTY LOGIN
exports.facultyLogin = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    const faculty = await Faculty.findOne({ facultyId: facultyId?.trim() });
    if (!faculty || faculty.password !== password) {
      return res.json({ message: "Invalid Faculty" });
    }

    return res.json({ message: "Login Success", faculty });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {
    const { id, newPassword, role } = req.body;

    if (!id || !newPassword || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (role === "student") {
      await Student.updateOne({ studentId: id }, { password: newPassword });
    }

    if (role === "faculty") {
      await Faculty.updateOne({ facultyId: id }, { password: newPassword });
    }

    return res.json({ message: "Password Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// RESET PASSWORD (OLD METHOD - KEEP AS IT IS FOR NOW)
// Later we will change this to email-based forget password.
exports.resetPassword = async (req, res) => {
  try {
    const { studentId, birthdate } = req.body;

    if (!studentId || !birthdate) {
      return res.status(400).json({ message: "All fields required" });
    }

    await Student.updateOne({ studentId }, { password: birthdate });
    return res.json({ message: "Password Reset" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};