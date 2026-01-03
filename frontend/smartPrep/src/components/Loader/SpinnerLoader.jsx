import React from "react";

const SpinnerLoader = () => {
  return (
    <svg
      className="w-5 h-5 animate-spin text-gray-400"
      viewBox="0 0 50 50"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="90 150"
      />
    </svg>
  );
};

export default SpinnerLoader;
