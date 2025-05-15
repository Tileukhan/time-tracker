import { useState } from "react";
import { login } from "../api/authApi";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (iin: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await login(iin);

      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
