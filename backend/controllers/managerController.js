const Absence = require("../models/Absence");
const WorkTime = require("../models/WorkTime");
const Employee = require("../models/Employee");
const PDFDocument = require("pdfkit");
const mongoose = require("mongoose");
const path = require("path");
const getAbsences = async (req, res) => {
  try {
    const { status, iin, startDate, endDate } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (iin) filter.employeeIIN = iin;
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const absences = await Absence.find(filter).sort({ date: -1 });

    res.status(200).json(absences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const updateAbsenceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Некорректный статус" });
    }

    const absence = await Absence.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!absence) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    res.status(200).json({ message: "Статус обновлён", absence });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const exportWorkTimes = async (req, res) => {
  try {
    const { startDate, endDate, iin } = req.query;
    const filter = {};

    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    }
    if (iin) {
      filter.employeeIIN = iin;
    }

    const workTimes = await WorkTime.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "employees",
          localField: "employeeIIN",
          foreignField: "iin",
          as: "employeeData",
        },
      },
      { $unwind: "$employeeData" },
      {
        $addFields: {
          fullName: "$employeeData.fullName",
        },
      },
      { $sort: { date: 1 } },
    ]);

    const PDFDocument = require("pdfkit");
    const path = require("path");
    const doc = new PDFDocument({ margin: 30 });
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.contentType("application/pdf");
      res.send(pdfData);
    });

    const fontPath = path.join(__dirname, "..", "fonts", "Roboto-Medium.ttf");
    doc.font(fontPath);

    doc.fontSize(16).text("Отчёт по рабочему времени", { align: "center" });
    doc.moveDown();

    // Заголовки таблицы
    doc.fontSize(12).text("Сотрудник", 30, 150);
    doc.text("Дата", 180, 150);
    doc.text("Начало", 280, 150);
    doc.text("Конец", 370, 150);
    doc.text("Отработано", 470, 150);
    doc.moveTo(30, 165).lineTo(570, 165).stroke();

    let y = 180;
    let totalMinutes = 0;

    const calculateMinutes = (start, end) => {
      const [sh, sm] = start.split(":").map(Number);
      const [eh, em] = end.split(":").map(Number);
      return eh * 60 + em - (sh * 60 + sm);
    };

    workTimes.forEach((item) => {
      const mins = calculateMinutes(item.startTime, item.endTime);
      totalMinutes += mins;
      const h = Math.floor(mins / 60);
      const m = mins % 60;

      doc.fontSize(10).text(item.fullName, 30, y);
      doc.text(item.date, 180, y);
      doc.text(item.startTime, 280, y);
      doc.text(item.endTime, 370, y);
      doc.text(`${h}ч ${m}м`, 470, y);
      y += 20;
    });

    doc.moveTo(30, y).lineTo(570, y).stroke();
    doc
      .fontSize(12)
      .text(
        `Итого: ${Math.floor(totalMinutes / 60)}ч ${totalMinutes % 60}м`,
        420,
        y + 10
      );

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const getWorkTimes = async (req, res) => {
  try {
    const { startDate, endDate, iin } = req.query;

    const filter = {};

    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    }

    if (iin) {
      filter.employeeIIN = iin;
    }

    const workTimes = await WorkTime.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "employees",
          localField: "employeeIIN",
          foreignField: "iin",
          as: "employeeData",
        },
      },
      { $unwind: "$employeeData" },
      {
        $addFields: {
          fullName: "$employeeData.fullName",
        },
      },
      { $sort: { date: -1 } },
    ]);

    res.status(200).json(workTimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getAbsences,
  updateAbsenceStatus,
  exportWorkTimes,
  getWorkTimes,
};
