const express = require("express");
const {
  submitWorkTime,
  submitAbsence,
  getMyAbsences,
} = require("../controllers/employeeController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/worktime", submitWorkTime);

router.post("/absence", upload.single("document"), submitAbsence);
router.get("/my-absences", getMyAbsences);
module.exports = router;
