import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl p-10 text-center animate-fadeIn">
      <h2 className="text-4xl font-bold text-blue-800 mb-4 drop-shadow">
        Welcome to Mini Payrun Dashboard
      </h2>
      <p className="text-gray-700 text-lg max-w-xl mx-auto">
        Manage employees, record timesheets, generate payruns, and review payslips — all in one
        simple dashboard.
      </p>
    </div>
  );
};

export default Dashboard;
