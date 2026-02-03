const Attendance = require("../models/temp");
const Lecture = require("../models/Lecture");

// FACULTY / QR MARK ATTENDANCE
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, date, subject, status, lectureCode } = req.body;

    // Lecture Active Check
const lecture = await Lecture.findOne({
  lectureCode: lectureCode,
  status: "active"
});

if (!lecture) {
  return res.json({ message: "Lecture Not Active" });
}


    // 2. Duplicate Check
    const existing = await Attendance.findOne({
      studentId: studentId,
      lectureCode: lectureCode
    });

    if (existing) {
      return res.json({ message: "Already Marked" });
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

// STUDENT VIEW ATTENDANCE
exports.getAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const data = await Attendance.find({ studentId });
    res.json(data);

  } catch (err) {
    res.json({ message: "Error Fetching Attendance" });
  }
};
