import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("resort_user")) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      localStorage.setItem("resort_token", data.token);
      localStorage.setItem("resort_user", JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await api.register(name, email, password);
      localStorage.setItem("resort_token", data.token);
      localStorage.setItem("resort_user", JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("resort_token");
    localStorage.removeItem("resort_user");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("resort_token");
    if (!token) return;
    api.me()
      .then((data) => {
        localStorage.setItem("resort_user", JSON.stringify(data.user));
        setUser(data.user);
      })
      .catch(() => logout());
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
