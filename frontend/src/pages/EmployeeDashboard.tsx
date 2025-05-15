import Navbar from "../components/Navbar";
import WorkTimeForm from "../components/WorkTimeForm";
import AbsenceForm from "../components/AbsenceForm";
import MyAbsences from "../components/MyAbsences";

const EmployeeDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.iin) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <Navbar fullName={user.fullName} role={"employee"} />
      <div className="p-4 space-y-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Рабочее время</h2>
          <WorkTimeForm iin={user.iin} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Отсутствие</h2>
          <AbsenceForm iin={user.iin} />
        </div>
        <MyAbsences iin={user.iin} /> {/* <-- Новый компонент */}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
