import { useState, useEffect } from "react";
import { getMyAbsences } from "../api/employeeApi";

interface Absence {
  _id: string;
  date: string;
  absenceStart: string;
  absenceEnd: string;
  reason: string;
  status: string;
}

const MyAbsences = ({ iin }: { iin: string }) => {
  const [absences, setAbsences] = useState<Absence[]>([]);

  useEffect(() => {
    fetchAbsences();
  }, []);

  const fetchAbsences = async () => {
    const data = await getMyAbsences(iin);
    setAbsences(data);
  };

  const statusLabel = {
    pending: {
      text: "Ожидает",
      color: "bg-yellow-100 text-yellow-800",
    },
    approved: {
      text: "Одобрено",
      color: "bg-emerald-100 text-emerald-700",
    },
    rejected: {
      text: "Отклонено",
      color: "bg-red-100 text-red-600",
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Мои заявки на отсутствие
      </h2>

      {absences.length === 0 ? (
        <p className="text-gray-500">Нет заявок.</p>
      ) : (
        <div className="space-y-4">
          {absences.map((absence) => (
            <div
              key={absence._id}
              className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50"
            >
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <b>Дата:</b> {absence.date}
                </p>
                <p>
                  <b>Время:</b> {absence.absenceStart} – {absence.absenceEnd}
                </p>
                <p>
                  <b>Причина:</b> {absence.reason}
                </p>
              </div>

              <div className="mt-3 sm:mt-0">
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-xl ${
                    statusLabel[absence.status as keyof typeof statusLabel]
                      .color
                  }`}
                >
                  {statusLabel[absence.status as keyof typeof statusLabel].text}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAbsences;
