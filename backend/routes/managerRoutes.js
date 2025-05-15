const express = require("express");
const {
  getAbsences,
  updateAbsenceStatus,
  exportWorkTimes,
  getWorkTimes,
} = require("../controllers/managerController");

const router = express.Router();

// GET /api/manager/absences
router.get("/absences", getAbsences);

// PATCH /api/manager/absences/:id
router.patch("/absences/:id", updateAbsenceStatus);

// GET /api/manager/export
router.get("/export", exportWorkTimes);

router.get("/worktimes", getWorkTimes);
module.exports = router;
