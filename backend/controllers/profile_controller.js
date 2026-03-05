const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");

exports.getStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({ studentId }).select("-password -__v");
    if (!student) return res.json({ message: "Student Not Found" });

    return res.json({ role: "student", profile: student });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Profile Error" });
  }
};

exports.getFacultyProfile = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const faculty = await Faculty.findOne({ facultyId }).select("-password -__v");
    if (!faculty) return res.json({ message: "Faculty Not Found" });

    return res.json({ role: "faculty", profile: faculty });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Profile Error" });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await Admin.findOne({ adminId }).select("-password -__v");
    if (!admin) return res.json({ message: "Admin Not Found" });

    return res.json({ role: "admin", profile: admin });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Profile Error" });
  }
};