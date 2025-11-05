import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Logo from '../components/Logo';

const DashboardPage = () => {
  const { user, configKey, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <Logo />
        <Button variant="secondary" onClick={logout} className="w-auto px-6 py-2 text-sm">
          Logout
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Welcome, {user?.name || 'User'} 👋
        </h1>
        <p className="text-gray-600 max-w-2xl mb-6">
          Your configuration key has been successfully validated. You now have access to the Stackguard dashboard, where you can monitor your security and configurations.
        </p>

        <div className="bg-white shadow-sm rounded-lg p-6 max-w-lg w-full border">
          <h2 className="font-semibold text-gray-800 mb-2">Configuration Key</h2>
          <p className="text-gray-500 text-sm break-words">{configKey}</p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
