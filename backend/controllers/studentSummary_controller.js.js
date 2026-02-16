const Attendance = require("../models/Attendance");

// GET /api/student/:studentId/summary
const getStudentAttendanceSummary = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Group attendance by subject for this student
    const subjectsData = await Attendance.aggregate([
      { $match: { studentId } },
      {
        $group: {
          _id: "$subject",
          total: { $sum: 1 },
          present: {
            $sum: {
              $cond: [{ $eq: ["$status", "Present"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          subject: "$_id",
          total: 1,
          present: 1,
          percentage: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              { $multiply: [{ $divide: ["$present", "$total"] }, 100] }
            ]
          }
        }
      },
      { $sort: { subject: 1 } }
    ]);

    // Round subject percentages
    const subjects = subjectsData.map(s => ({
      subject: s.subject,
      present: s.present,
      total: s.total,
      percentage: Math.round(s.percentage * 100) / 100
    }));

    // Overall average = average of subject percentages
    let overallPercentage = 0;
    if (subjects.length > 0) {
      const sum = subjects.reduce((acc, s) => acc + s.percentage, 0);
      overallPercentage = sum / subjects.length;
      overallPercentage = Math.round(overallPercentage * 100) / 100;
    }

    return res.json({
      studentId,
      subjects,
      overallPercentage
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getStudentAttendanceSummary };
