import React from "react";

const Timesheets: React.FC = () => {
  const timesheets = [
    { employeeId: "E001", hoursWorked: 40 },
    { employeeId: "E002", hoursWorked: 38 },
    { employeeId: "E003", hoursWorked: 42 },
  ];

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-fadeIn">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Timesheets</h2>
      <table className="w-full text-center border border-blue-200 rounded-xl overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Employee ID</th>
            <th className="p-3">Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((t, i) => (
            <tr key={t.employeeId} className={`${i % 2 ? "bg-blue-50" : "bg-white/70"}`}>
              <td className="p-3">{t.employeeId}</td>
              <td className="p-3">{t.hoursWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheets;
