const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  lectureCode: String,
  status: {
    type: String,
    default: "Present"
  },
  timeMarked: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);