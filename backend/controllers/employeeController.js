const WorkTime = require("../models/WorkTime");
const Absence = require("../models/Absence");

const submitWorkTime = async (req, res) => {
  try {
    const { employeeIIN, date, startTime, endTime } = req.body;

    if (!employeeIIN || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const workTime = new WorkTime({ employeeIIN, date, startTime, endTime });
    await workTime.save();

    return res.status(201).json({ message: "Рабочее время сохранено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const submitAbsence = async (req, res) => {
  try {
    const { employeeIIN, date, absenceStart, absenceEnd, reason } = req.body;
    const file = req.file;

    if (!employeeIIN || !date || !absenceStart || !absenceEnd || !reason) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const absence = new Absence({
      employeeIIN,
      date,
      absenceStart,
      absenceEnd,
      reason,
      documentUrl: file ? `/uploads/${file.filename}` : undefined,
    });

    await absence.save();

    return res.status(201).json({ message: "Заявка на отсутствие отправлена" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getMyAbsences = async (req, res) => {
  try {
    const { iin } = req.query;

    if (!iin) {
      return res.status(400).json({ message: "Не указан ИИН" });
    }

    const absences = await Absence.find({ employeeIIN: iin }).sort({
      date: -1,
    });

    res.status(200).json(absences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { submitWorkTime, submitAbsence, getMyAbsences };
