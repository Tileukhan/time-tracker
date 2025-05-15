import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import WorktimePage from "./pages/WorktimePage";
import AbsencePage from "./pages/AbsencePage";
import HistoryPage from "./pages/HistoryPage";
import ManagerAbsencesPage from "./pages/ManagerAbsencesPage";
import ManagerWorktimesPage from "./pages/ManagerWorktimesPage";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && user.iin && (
        <Navbar fullName={user.fullName} role={user.role} />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/employee/worktime"
          element={
            <PrivateRoute role="employee">
              <WorktimePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/absence"
          element={
            <PrivateRoute role="employee">
              <AbsencePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/history"
          element={
            <PrivateRoute role="employee">
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/absences"
          element={
            <PrivateRoute role="manager">
              <ManagerAbsencesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/worktimes"
          element={
            <PrivateRoute role="manager">
              <ManagerWorktimesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="manager">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
