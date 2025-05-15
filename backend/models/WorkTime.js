const mongoose = require("mongoose");

const WorkTimeSchema = new mongoose.Schema({
  employeeIIN: {
    type: String,
    required: true,
  },
  date: {
    type: String, // ISO-дата вида "2025-04-27"
    required: true,
  },
  startTime: {
    type: String, // Часы:Минуты (например, "09:00")
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("WorkTime", WorkTimeSchema);
