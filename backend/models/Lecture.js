const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  lectureCode: String, // ex: SE101 (subject code)
  subject: String,
  day: String,
  startTime: String,
  endTime: String,
  status: {
    type: String,
    default: "closed"
  },

  // ✅ NEW (to track session timing)
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date, default: null }
});

module.exports = mongoose.model("Lecture", lectureSchema);