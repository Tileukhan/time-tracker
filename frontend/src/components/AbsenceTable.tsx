interface Absence {
  _id: string;
  employeeIIN: string;
  fullName?: string;
  date: string;
  absenceStart: string;
  absenceEnd: string;
  reason: string;
  documentUrl?: string;
  status: string;
}

interface AbsenceTableProps {
  absences: Absence[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const AbsenceTable = ({ absences, onApprove, onReject }: AbsenceTableProps) => {
  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-600",
  };

  const statusText = {
    pending: "Ожидает",
    approved: "Одобрено",
    rejected: "Отклонено",
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-left text-gray-700 font-semibold">
          <tr>
            <th className="px-4 py-3">Сотрудник</th>
            <th className="px-4 py-3">Дата</th>
            <th className="px-4 py-3">Время отсутствия</th>
            <th className="px-4 py-3">Причина</th>
            <th className="px-4 py-3">Статус</th>
            <th className="px-4 py-3">Документ</th>
            <th className="px-4 py-3 text-center">Действия</th>
          </tr>
        </thead>
        <tbody>
          {absences.map((abs) => (
            <tr key={abs._id} className="border-t text-gray-800">
              <td className="px-4 py-2">{abs.fullName || abs.employeeIIN}</td>
              <td className="px-4 py-2">{abs.date}</td>
              <td className="px-4 py-2">
                {abs.absenceStart} – {abs.absenceEnd}
              </td>
              <td className="px-4 py-2">{abs.reason}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-3 py-1 rounded-xl text-xs font-medium ${
                    statusStyle[abs.status as keyof typeof statusStyle]
                  }`}
                >
                  {statusText[abs.status as keyof typeof statusText]}
                </span>
              </td>
              <td className="px-4 py-2">
                {abs.documentUrl && (
                  <a
                    href={`http://localhost:5000${abs.documentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 underline hover:text-emerald-800"
                  >
                    Открыть
                  </a>
                )}
              </td>
              <td className="px-4 py-2 text-center">
                {abs.status === "pending" && (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onApprove(abs._id)}
                      className="px-3 py-1 rounded-lg bg-emerald-500 text-white text-sm hover:bg-emerald-600"
                    >
                      Одобрить
                    </button>
                    <button
                      onClick={() => onReject(abs._id)}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                    >
                      Отклонить
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenceTable;
