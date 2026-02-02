const express = require("express");
const router = express.Router();

const {
  startLecture,
  endLecture
} = require("../controllers/lectureController");

router.post("/start", startLecture);
router.post("/end", endLecture);

module.exports = router;
