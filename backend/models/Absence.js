const mongoose = require("mongoose");

const AbsenceSchema = new mongoose.Schema({
  employeeIIN: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  absenceStart: {
    type: String,
    required: true,
  },
  absenceEnd: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    enum: ["Болезнь", "Отпуск", "Командировка", "Семейные обстоятельства"],
    required: true,
  },
  documentUrl: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Absence", AbsenceSchema);
