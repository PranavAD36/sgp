const Lecture = require("../models/Lecture");

exports.startLecture = async (req, res) => {
  try {
    const { lectureCode, subject, day, startTime, endTime } = req.body;

    const lecture = new Lecture({
      lectureCode,
      subject,
      day,
      startTime,
      endTime,
      status: "active"
    });

    await lecture.save();

    res.json({ message: "Lecture Started" });
  } catch (err) {
    res.json({ message: "Error starting lecture" });
  }
};

exports.endLecture = async (req, res) => {
  try {
    const { lectureCode } = req.body;

    await Lecture.updateOne(
      { lectureCode },
      { status: "closed" }
    );

    res.json({ message: "Lecture Closed" });
  } catch (err) {
    res.json({ message: "Error closing lecture" });
  }
};
