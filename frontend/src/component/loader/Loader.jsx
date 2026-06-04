import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-gray-100 dark:border-gray-800"></div>
        <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide animate-pulse">
        Загрузка новости...
      </p>
    </div>
  );
};

export default Loader;