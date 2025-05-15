import MyAbsences from "../components/MyAbsences";

const HistoryPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.iin || user.role !== "employee") {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">История моих заявок</h1>
      <MyAbsences iin={user.iin} />
    </div>
  );
};

export default HistoryPage;
