const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  name: String,
  password: String,
  role: { type: String, default: "student" }
});

module.exports = mongoose.model("Student", studentSchema);
