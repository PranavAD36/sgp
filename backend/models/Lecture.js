const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  lectureCode: String,
  subject: String,
  day: String,
  startTime: String,
  endTime: String,
  status: {
    type: String,
    default: "closed"
  }
});

module.exports = mongoose.model("Lecture", lectureSchema);
