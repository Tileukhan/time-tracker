import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { getAbsences, getWorkTimes } from "../api/managerApi";

// Цвета для графиков
const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

// Типизация
interface Absence {
  status: "pending" | "approved" | "rejected";
}

interface WorkTime {
  fullName?: string;
  employeeIIN: string;
  date: string;
  startTime: string;
  endTime: string;
}

const AdminDashboard = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [workTimes, setWorkTimes] = useState<WorkTime[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const abs = await getAbsences({});
    const work = await getWorkTimes({});
    setAbsences(abs);
    setWorkTimes(work);
  };

  const calculateMinutes = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return eh * 60 + em - (sh * 60 + sm);
  };

  // --- 1. Статистика заявок
  const statusCounts = [
    {
      name: "Ожидает",
      value: absences.filter((a) => a.status === "pending").length,
    },
    {
      name: "Одобрено",
      value: absences.filter((a) => a.status === "approved").length,
    },
    {
      name: "Отклонено",
      value: absences.filter((a) => a.status === "rejected").length,
    },
  ];

  // --- 2. Часы по дням
  const workByDate = workTimes.reduce((acc: Record<string, number>, item) => {
    const minutesWorked = calculateMinutes(item.startTime, item.endTime);
    if (!acc[item.date]) acc[item.date] = 0;
    acc[item.date] += minutesWorked;
    return acc;
  }, {});

  const workDateData = Object.keys(workByDate).map((date) => ({
    date,
    hours: +(workByDate[date] / 60).toFixed(2),
  }));

  // --- 3. Топ-5 сотрудников
  const workByEmployee = workTimes.reduce(
    (acc: Record<string, number>, item) => {
      const minutesWorked = calculateMinutes(item.startTime, item.endTime);
      const key = item.fullName || item.employeeIIN; // 👈 используем имя, если есть
      if (!acc[key]) acc[key] = 0;
      acc[key] += minutesWorked;
      return acc;
    },
    {}
  );

  const topEmployees = Object.keys(workByEmployee)
    .map((name) => ({
      name, // 👈 уже не iin
      hours: +(workByEmployee[name] / 60).toFixed(2),
    }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Админ-панель: Статистика</h1>

      {/* Блок 1: PieChart по статусам */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Статистика заявок на отсутствие
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {statusCounts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Блок 2: LineChart по часам */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Отработанные часы по дням
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={workDateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="hours" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Блок 3: BarChart по сотрудникам */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Топ-5 сотрудников по отработанным часам
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topEmployees}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
