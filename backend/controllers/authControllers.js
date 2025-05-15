const Employee = require("../models/Employee");

const login = async (req, res) => {
  try {
    const { iin } = req.body;

    if (!iin || iin.length !== 12) {
      return res.status(400).json({ message: "Некорректный ИИН" });
    }

    const employee = await Employee.findOne({ iin });

    if (!employee) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    return res.status(200).json({
      iin: employee.iin,
      fullName: employee.fullName,
      role: employee.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { login };
