import { useState, useEffect } from "react";
import { getWorkTimes, exportWorkTimes } from "../api/managerApi";
import Filters from "../components/Filters";
import WorkTimeTable from "../components/WorkTimeTable";

const ManagerWorktimesPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [workTimes, setWorkTimes] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
    iin: "",
  });

  useEffect(() => {
    fetchWorkTimes();
  }, [filters]);

  const fetchWorkTimes = async () => {
    const data = await getWorkTimes(filters);
    setWorkTimes(data);
  };

  const handleChangeFilter = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleExport = async () => {
    const blob = await exportWorkTimes(filters);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!user.iin || user.role !== "manager") {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Рабочее время сотрудников</h1>
      <Filters
        filters={filters}
        onChange={handleChangeFilter}
        onExport={handleExport}
      />
      <WorkTimeTable workTimes={workTimes} />
    </div>
  );
};

export default ManagerWorktimesPage;
