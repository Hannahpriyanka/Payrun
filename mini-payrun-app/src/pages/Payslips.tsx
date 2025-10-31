import React from "react";

const Payslips: React.FC = () => {
  const payslips = [
    { employeeId: "E001", name: "Alice Johnson", grossPay: 1000, tax: 200, netPay: 800 },
    { employeeId: "E002", name: "Bob Smith", grossPay: 1140, tax: 228, netPay: 912 },
    { employeeId: "E003", name: "Charlie Brown", grossPay: 1176, tax: 235.2, netPay: 940.8 },
  ];

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-fadeIn">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Payslips</h2>
      <table className="w-full text-center border border-blue-200 rounded-xl overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Employee ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Gross Pay</th>
            <th className="p-3">Tax</th>
            <th className="p-3">Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {payslips.map((p, i) => (
            <tr key={p.employeeId} className={`${i % 2 ? "bg-blue-50" : "bg-white/70"}`}>
              <td className="p-3">{p.employeeId}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">${p.grossPay}</td>
              <td className="p-3">${p.tax}</td>
              <td className="p-3 font-semibold text-green-700">${p.netPay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payslips;
