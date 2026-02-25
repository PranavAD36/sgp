const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminId: String,
  password: String,
  role: { type: String, default: "admin" }
});

module.exports = mongoose.model("Admin", adminSchema);
