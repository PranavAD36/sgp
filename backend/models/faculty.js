const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    facultyId: { type: String, unique: true, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "faculty" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);