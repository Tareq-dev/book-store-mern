import React from "react";

function Success() {
  return (
    <div className="text-center flex flex-col items-center justify-center h-screen pt-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>

      <p className="text-2xl font-semibold text-red-500">Payment Fail!</p>
      <p className="text-lg text-gray-600 mt-6">Please Try again..</p>
    </div>
  );
}

export default Success;
