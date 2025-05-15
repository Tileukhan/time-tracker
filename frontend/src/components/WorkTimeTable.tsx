interface WorkTime {
  _id: string;
  fullName: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface WorkTimeTableProps {
  workTimes: WorkTime[];
}

const WorkTimeTable = ({ workTimes }: WorkTimeTableProps) => {
  const calculateMinutes = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return eh * 60 + em - (sh * 60 + sm);
  };

  const totalMinutes = workTimes.reduce((sum, work) => {
    return sum + calculateMinutes(work.startTime, work.endTime);
  }, 0);

  const totalHours = Math.floor(totalMinutes / 60);
  const totalRestMinutes = totalMinutes % 60;

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Отработанное время сотрудников
      </h2>

      <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
        <table className="min-w-full text-[15px] text-gray-700">
          <thead className="bg-gray-100 text-left font-medium text-gray-600">
            <tr>
              <th className="px-4 py-3">Сотрудник</th>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Начало</th>
              <th className="px-4 py-3">Окончание</th>
              <th className="px-4 py-3">Отработано</th>
            </tr>
          </thead>
          <tbody>
            {workTimes.map((work, index) => {
              const minutes = calculateMinutes(work.startTime, work.endTime);
              const h = Math.floor(minutes / 60);
              const m = minutes % 60;
              return (
                <tr
                  key={work._id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">{work.fullName}</td>
                  <td className="px-4 py-3">{work.date}</td>
                  <td className="px-4 py-3 text-center">{work.startTime}</td>
                  <td className="px-4 py-3 text-center">{work.endTime}</td>
                  <td className="px-4 py-3 text-center">
                    {h}ч {m}м
                  </td>
                </tr>
              );
            })}

            <tr className="bg-emerald-50 border-t font-semibold text-emerald-700">
              <td className="px-4 py-3" colSpan={4}>
                Итого:
              </td>
              <td className="px-4 py-3 text-center">
                {totalHours}ч {totalRestMinutes}м
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkTimeTable;
