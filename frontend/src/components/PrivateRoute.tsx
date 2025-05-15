import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  role?: "employee" | "manager"; // Если указано — проверяем по роли
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.iin) {
    // Нет пользователя — отправляем на логин
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    // Неверная роль — отправляем на логин
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
