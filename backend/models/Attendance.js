const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: String,

  // ex: SE101 (still used for summary grouping)
  lectureCode: String,

  // ✅ NEW: links attendance to a particular lecture session
  lectureSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
    default: null
  },

  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present"
  },

  timeMarked: {
    type: Date,
    default: Date.now
  }
});

// ✅ Prevent duplicate entries for same student in same lecture session
attendanceSchema.index(
  { studentId: 1, lectureSessionId: 1 },
  { unique: true, sparse: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);