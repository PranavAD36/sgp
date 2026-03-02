const Lecture = require("../models/Lecture");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

exports.startLecture = async (req, res) => {
  try {
    const { lectureCode, subject, day, startTime, endTime } = req.body;

    if (!lectureCode) {
      return res.json({ message: "Missing lectureCode" });
    }

    // ✅ Safety: close any old active lecture with same code
    await Lecture.updateMany(
      { lectureCode, status: "active" },
      { status: "closed", endedAt: new Date() }
    );

    const lecture = new Lecture({
      lectureCode,
      subject,
      day,
      startTime,
      endTime,
      status: "active",
      startedAt: new Date(),
      endedAt: null
    });

    await lecture.save();

    return res.json({
      message: "Lecture Started",
      lectureSessionId: lecture._id
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Error starting lecture" });
  }
};

exports.endLecture = async (req, res) => {
  try {
    const { lectureCode } = req.body;

    if (!lectureCode) {
      return res.json({ message: "Missing lectureCode" });
    }

    // ✅ Find the active lecture session
    const lecture = await Lecture.findOne({ lectureCode, status: "active" });

    if (!lecture) {
      return res.json({ message: "Lecture Not Active" });
    }

    const now = new Date();

    // ✅ Close lecture
    lecture.status = "closed";
    lecture.endedAt = now;
    await lecture.save();

    // ✅ Get ALL students
    const allStudentIds = await Student.distinct("studentId");

    // ✅ Get students who marked Present in this session
    const presentStudentIds = await Attendance.distinct("studentId", {
      lectureSessionId: lecture._id,
      status: "Present"
    });

    const presentSet = new Set(presentStudentIds);

    // ✅ Create Absent for those who did NOT mark
    const absentDocs = [];
    for (const sid of allStudentIds) {
      if (!presentSet.has(sid)) {
        absentDocs.push({
          studentId: sid,
          lectureCode: lectureCode,
          lectureSessionId: lecture._id,
          status: "Absent",
          timeMarked: now
        });
      }
    }

    if (absentDocs.length > 0) {
      // ordered:false = continue even if some duplicates happen
      await Attendance.insertMany(absentDocs, { ordered: false });
    }

    return res.json({
      message: "Lecture Closed",
      totalStudents: allStudentIds.length,
      presentCount: presentStudentIds.length,
      absentAdded: absentDocs.length
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Error closing lecture" });
  }
};