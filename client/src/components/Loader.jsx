import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full z-90">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;