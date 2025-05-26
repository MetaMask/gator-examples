import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">
        Detecting MetaMask Flask...
      </span>
    </div>
  );
};

export default Loader;
