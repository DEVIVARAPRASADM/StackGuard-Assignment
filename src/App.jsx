import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import ConfigurationPage from "./pages/ConfigurationPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("auth");
  const { user, configKey, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) setCurrentPage("auth");
      else if (!configKey) setCurrentPage("config");
      else setCurrentPage("dashboard");
    }
  }, [user, configKey, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentPage === "auth" && <AuthPage onSuccess={() => setCurrentPage("config")} />}
      {currentPage === "config" && <ConfigurationPage onSuccess={() => setCurrentPage("dashboard")} />}
      {currentPage === "dashboard" && <DashboardPage />}
    </>
  );
};

export default App;