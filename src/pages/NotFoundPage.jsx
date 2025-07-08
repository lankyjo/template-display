import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        Sorry, the template or page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-black text-white font-bold hover:bg-black/80 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;