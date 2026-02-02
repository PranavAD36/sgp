const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  facultyId: { type: String, unique: true },
  name: String,
  password: String,
  role: { type: String, default: "faculty" }
});

module.exports = mongoose.model("Faculty", facultySchema);
