import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Logo from '../components/Logo';

const AuthPage = ({ onSuccess }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = () => {
    const newErrors = {};
    if (!isSignIn) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters';
    if (!isSignIn && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        if (isSignIn) signIn(formData.email, formData.password);
        else signUp(formData.firstName, formData.lastName, formData.email, formData.password);
        setIsSubmitting(false);
        onSuccess();
      }, 500);
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gray-200 items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Logo />
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {isSignIn ? 'Welcome back to Stackguard' : 'Welcome to Stackguard'}
            </h1>
            <p className="text-sm text-gray-500">
              Secure your codebase with advanced secret scanning security best practices
            </p>
          </div>
          <div className="space-y-4" onKeyPress={handleKeyPress}>
            {!isSignIn && (
              <div className="grid grid-cols-2 gap-3">
                <Input type="text" placeholder="Enter first name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} error={errors.firstName} />
                <Input type="text" placeholder="Enter last name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} error={errors.lastName} />
              </div>
            )}
            <Input type="email" placeholder="Enter email ID" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} />
            <Input type="password" placeholder="Enter password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} error={errors.password} />
            {!isSignIn && (
              <Input type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} error={errors.confirmPassword} />
            )}
            <Button onClick={handleSubmit} disabled={isSubmitting} variant={isSignIn ? 'primary' : 'secondary'}>
              {isSubmitting ? 'Processing...' : isSignIn ? 'Signin' : 'Create account'}
            </Button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-4">
              By continuing, you agree to our{' '}
              <button className="text-gray-700 underline">Terms of Service</button> and{' '}
              <button className="text-gray-700 underline">Privacy Policy</button>
            </p>
            <p className="text-sm text-gray-600">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <button onClick={toggleMode} className="text-purple-700 font-medium underline">
                {isSignIn ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
