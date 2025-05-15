import { useState, useEffect } from "react";
import { getAbsences, updateAbsenceStatus } from "../api/managerApi";
import Filters from "../components/Filters";
import AbsenceTable from "../components/AbsenceTable";

const ManagerAbsencesPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [absences, setAbsences] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
    iin: "",
  });

  useEffect(() => {
    fetchAbsences();
  }, [filters]);

  const fetchAbsences = async () => {
    const data = await getAbsences(filters);
    setAbsences(data);
  };

  const handleApprove = async (id: string) => {
    await updateAbsenceStatus(id, "approved");
    fetchAbsences();
  };

  const handleReject = async (id: string) => {
    await updateAbsenceStatus(id, "rejected");
    fetchAbsences();
  };

  const handleChangeFilter = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (!user.iin || user.role !== "manager") {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">
        Заявки на отсутствие сотрудников
      </h1>
      <Filters
        filters={filters}
        onChange={handleChangeFilter}
        onExport={() => {}}
      />
      <AbsenceTable
        absences={absences}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default ManagerAbsencesPage;
