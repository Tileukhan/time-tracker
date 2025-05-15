import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [iin, setIin] = useState("");
  const { loginUser, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await loginUser(iin);

    if (user) {
      if (user.role === "employee") {
        navigate("/employee/worktime");
      } else if (user.role === "manager") {
        navigate("/manager/absences");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Вход по ИИН
        </h2>

        <input
          type="text"
          value={iin}
          onChange={(e) => setIin(e.target.value)}
          placeholder="Введите ваш ИИН"
          maxLength={12}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition disabled:bg-gray-400"
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default Login;
