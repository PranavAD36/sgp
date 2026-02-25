const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");


// ================= ADMIN LOGIN =================
exports.adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admin = await Admin.findOne({ adminId });

    if (!admin || admin.password !== password)
      return res.json({ message: "Invalid Admin" });

    res.json({ message: "Admin Login Success" });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error" });
  }
};


// ================= ADD STUDENT =================
exports.addStudent = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);   // 👈 DEBUG

    const { studentId, name, email, phone, password } = req.body;

    const newStudent = new Student({
      studentId,
      name,
      email,
      phone,
      password
    });

    await newStudent.save();

    res.json({ message: "Student Added Successfully" });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error Adding Student" });
  }
};


// ================= ADD FACULTY =================
exports.addFaculty = async (req, res) => {
  try {
    console.log("Incoming Faculty Data:", req.body); // 👈 DEBUG

    const { facultyId, name, email, phone, password } = req.body;

    const newFaculty = new Faculty({
      facultyId,
      name,
      email,
      phone,
      password
    });

    await newFaculty.save();

    res.json({ message: "Faculty Added Successfully" });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error Adding Faculty" });
  }
};


// ================= STUDENT LOGIN =================
exports.studentLogin = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    const student = await Student.findOne({ studentId });

    if (!student || student.password !== password)
      return res.json({ message: "Invalid Student" });

    res.json({ message: "Login Success", student });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error" });
  }
};


// ================= FACULTY LOGIN =================
exports.facultyLogin = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    const faculty = await Faculty.findOne({ facultyId });

    if (!faculty || faculty.password !== password)
      return res.json({ message: "Invalid Faculty" });

    res.json({ message: "Login Success", faculty });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error" });
  }
};


// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
  try {
    const { id, newPassword, role } = req.body;

    if (role === "student") {
      await Student.updateOne(
        { studentId: id },
        { password: newPassword }
      );
    }

    if (role === "faculty") {
      await Faculty.updateOne(
        { facultyId: id },
        { password: newPassword }
      );
    }

    res.json({ message: "Password Updated" });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error Updating Password" });
  }
};


// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { studentId, birthdate } = req.body;

    await Student.updateOne(
      { studentId },
      { password: birthdate }
    );

    res.json({ message: "Password Reset" });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error Resetting Password" });
  }
};