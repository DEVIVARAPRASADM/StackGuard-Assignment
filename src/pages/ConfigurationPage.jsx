import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Logo from '../components/Logo';

const ConfigurationPage = ({ onConfigured }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const { setConfiguration } = useAuth();

  const validateKey = (value) => value.length >= 100 && value.length <= 1000;

  const handleSubmit = () => {
    if (!key.trim()) {
      setError('Configuration key is required');
      return;
    }
    if (!validateKey(key)) {
      setError('Key must be between 100 and 1000 characters');
      return;
    }
    setError('');
    setConfiguration(key);
    onConfigured();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm">
        <Logo />
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Configuration</h1>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your unique configuration key to continue.
        </p>

        <Input
          type="text"
          placeholder="Enter configuration key..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          error={error}
        />

        <Button
          onClick={handleSubmit}
          className="mt-6"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ConfigurationPage;
