import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to RoomFund 🚪💰</h1>
      <p className="text-gray-600 mb-6">Please sign in with Google to continue</p>
      <button
        onClick={() =>
          signInWithGoogle().catch((e) => {
            console.error('❌ Login error:', e);
            alert('Google login failed. Check the console.');
          })
        }
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
};
