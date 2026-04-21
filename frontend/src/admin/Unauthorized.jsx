import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-red-500 mb-4">401</div>
        <h1 className="text-3xl font-bold text-white mb-4">Unauthorized Access</h1>
        <p className="text-gray-400 mb-8">
          You need to login to access the admin dashboard.
        </p>
        <Link 
          to="/admin-login" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 hover:scale-[1.02] shadow-lg"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;