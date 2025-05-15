import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react"; // Убедись, что lucide-react установлен

interface Props {
  fullName: string;
  role: "employee" | "manager";
}

const Navbar = ({ fullName, role }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const links =
    role === "employee"
      ? [
          { label: "Рабочее время", path: "/employee/worktime" },
          { label: "Отсутствие", path: "/employee/absence" },
          { label: "Мои заявки", path: "/employee/history" },
        ]
      : [
          { label: "Заявки на отсутствие", path: "/manager/absences" },
          { label: "Рабочее время сотрудников", path: "/manager/worktimes" },
          { label: "Админ-панель", path: "/admin/dashboard" },
        ];

  return (
    <nav className="bg-emerald-600 text-white px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg">Time Tracker</div>

        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 font-medium text-sm hover:underline"
          >
            {fullName}
            <ChevronDown className="w-4 h-4" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-lg z-50 overflow-hidden">
              {links.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {link.label}
                </button>
              ))}

              <hr className="my-1 border-gray-200" />

              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
