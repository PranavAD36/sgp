const Attendance = require("../models/Attendance");
const Lecture = require("../models/Lecture");

// MARK ATTENDANCE
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, date, subject, status, lectureCode } = req.body;

    // 1. Lecture Active Check
    const lecture = await Lecture.findOne({
      lectureCode: lectureCode,
      status: "active"
    });

    if (!lecture) {
      return res.json({ message: "Lecture Not Active" });
    }

    // 2. 30 Minute Duplicate Check
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);

    const existing = await Attendance.findOne({
      studentId: studentId,
      lectureCode: lectureCode,
      timeMarked: { $gt: thirtyMinAgo }
    });

    if (existing) {
  const now = new Date();
  const diff = now - existing.timeMarked;
  const remainingMs = 30 * 60 * 1000 - diff;
  const remainingMin = Math.ceil(remainingMs / 60000);

  return res.json({
    message: "WAIT",
    remaining: remainingMin
  });
}


    // 3. Save Attendance
    const record = new Attendance({
      studentId,
      date,
      subject,
      status,
      lectureCode
    });

    await record.save();

    res.json({ message: "Attendance Marked" });

  } catch (err) {
    console.log(err);
    res.json({ message: "Error Marking Attendance" });
  }
};

// VIEW ATTENDANCE
exports.getAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const data = await Attendance.find({ studentId });
    res.json(data);

  } catch (err) {
    console.log(err);
    res.json({ message: "Error Fetching Attendance" });
  }
};
