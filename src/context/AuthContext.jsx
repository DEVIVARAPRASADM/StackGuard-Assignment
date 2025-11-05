import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [configKey, setConfigKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedKey = sessionStorage.getItem("configKey");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedKey) setConfigKey(storedKey);
    setLoading(false);
  }, []);

  const signIn = (email, password) => {
    const userData = { email, name: email.split("@")[0] };
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    return true;
  };

  const signUp = (firstName, lastName, email, password) => {
    const userData = { email, name: `${firstName} ${lastName}`, firstName, lastName };
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    return true;
  };

  const setConfiguration = (key) => {
    setConfigKey(key);
    sessionStorage.setItem("configKey", key);
  };

  const logout = () => {
    setUser(null);
    setConfigKey(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("configKey");
  };

  return (
    <AuthContext.Provider value={{ user, configKey, loading, signIn, signUp, setConfiguration, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
