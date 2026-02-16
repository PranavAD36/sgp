const Attendance = require("../models/Attendance");
const Lecture = require("../models/Lecture");

// MARK ATTENDANCE
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, date, subject, status, lectureCode } = req.body;

    const lecture = await Lecture.findOne({
      lectureCode,
      status: "active"
    });

    if (!lecture) {
      return res.json({ message: "Lecture Not Active" });
    }

    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);

    const existing = await Attendance.findOne({
      studentId,
      lectureCode,
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

// VIEW RAW ATTENDANCE
exports.getAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await Attendance.find({ studentId });
    res.json(data);
  } catch {
    res.json({ message: "Error Fetching Attendance" });
  }
};

// ===== NEW SUMMARY FUNCTION =====
exports.getSummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await Attendance.find({ studentId });

    let subjects = {};
    let overallSum = 0;
    let count = 0;

    data.forEach(r => {
      if (!subjects[r.subject]) {
        subjects[r.subject] = { present: 0, total: 0 };
      }
      subjects[r.subject].total++;
      if (r.status === "Present") subjects[r.subject].present++;
    });

    let result = [];

    for (let sub in subjects) {
      let p = subjects[sub].present;
      let t = subjects[sub].total;
      let percent = Math.round((p / t) * 100);

      overallSum += percent;
      count++;

      result.push({ subject: sub, present: p, total: t, percent });
    }

    const overall = count ? Math.round(overallSum / count) : 0;

    res.json({ subjects: result, overall });

  } catch {
    res.json({ message: "Summary Error" });
  }
};
