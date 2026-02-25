const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true
  },
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
});

module.exports = mongoose.model("Student", studentSchema);