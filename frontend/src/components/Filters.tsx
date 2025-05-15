interface FiltersProps {
  filters: {
    status: string;
    startDate: string;
    endDate: string;
    iin: string;
  };
  onChange: (name: string, value: string) => void;
  onExport: () => void;
}

const Filters = ({ filters, onChange, onExport }: FiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Статус */}
        <select
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Все статусы</option>
          <option value="pending">На рассмотрении</option>
          <option value="approved">Одобрено</option>
          <option value="rejected">Отклонено</option>
        </select>

        {/* Дата начала */}
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => onChange("startDate", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        {/* Дата окончания */}
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => onChange("endDate", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        {/* Поиск по ИИН */}
        <input
          type="text"
          placeholder="ИИН сотрудника"
          value={filters.iin}
          onChange={(e) => onChange("iin", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onExport}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Экспортировать в PDF
        </button>
      </div>
    </div>
  );
};

export default Filters;
