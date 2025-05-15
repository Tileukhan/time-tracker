import AbsenceForm from "../components/AbsenceForm";

const AbsencePage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.iin || user.role !== "employee") {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Отправить заявку на отсутствие
      </h1>
      <AbsenceForm iin={user.iin} />
    </div>
  );
};

export default AbsencePage;
