const Attendance = require("../models/Attendance");
const Lecture = require("../models/Lecture");

/* ===============================
   MARK ATTENDANCE
================================ */
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, lectureCode } = req.body;

    if (!studentId || !lectureCode) {
      return res.json({ message: "Missing Data" });
    }

    // 1️⃣ Check if Lecture is Active
    const lecture = await Lecture.findOne({
      lectureCode: lectureCode,
      status: "active"
    });

    if (!lecture) {
      return res.json({ message: "Lecture Not Active" });
    }

    // 2️⃣ 30 Minute Rule
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

    // 3️⃣ Save Attendance
    const record = new Attendance({
      studentId: studentId,
      lectureCode: lectureCode,
      status: "Present"
    });

    await record.save();

    return res.json({ message: "Attendance Marked" });

  } catch (err) {
    console.log(err);
    return res.json({ message: "Error Marking Attendance" });
  }
};


/* ===============================
   VIEW RAW ATTENDANCE
================================ */
exports.getAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const data = await Attendance.find({ studentId });

    return res.json(data);

  } catch (err) {
    return res.json({ message: "Error Fetching Attendance" });
  }
};


/* ===============================
   SUMMARY
================================ */
exports.getSummary = async (req, res) => {
  try {
    const { studentId } = req.params;

    const data = await Attendance.find({ studentId });

    let subjects = {};
    let overallSum = 0;
    let count = 0;

    data.forEach(r => {

      // USE lectureCode (NOT subject)
      if (!subjects[r.lectureCode]) {
        subjects[r.lectureCode] = { present: 0, total: 0 };
      }

      subjects[r.lectureCode].total++;

      if (r.status === "Present") {
        subjects[r.lectureCode].present++;
      }
    });

    let result = [];

    for (let code in subjects) {
      let p = subjects[code].present;
      let t = subjects[code].total;
      let percent = Math.round((p / t) * 100);

      overallSum += percent;
      count++;

      result.push({
        subject: code,   // show lectureCode
        present: p,
        total: t,
        percent
      });
    }

    const overall = count ? Math.round(overallSum / count) : 0;

    res.json({ subjects: result, overall });

  } catch (err) {
    res.json({ message: "Summary Error" });
  }
};  