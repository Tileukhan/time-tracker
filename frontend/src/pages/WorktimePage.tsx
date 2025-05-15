import WorkTimeForm from "../components/WorkTimeForm";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const WorktimePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Рабочее время</h1>
      <WorkTimeForm iin={user.iin} />
    </div>
  );
};

export default WorktimePage;
