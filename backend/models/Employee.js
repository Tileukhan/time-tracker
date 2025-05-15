const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  iin: {
    type: String,
    required: true,
    unique: true,
    length: 12,
  },
  fullName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["employee", "manager"],
    required: true,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
