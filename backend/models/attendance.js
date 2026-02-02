const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  date: String,
  subject: String,
  status: String,
  lectureCode: String,   // NEW
  timeMarked: {          // NEW
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
