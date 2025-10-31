import React, { useState } from "react";
import { createPayrun } from "../services/api";

interface Result {
  employeeId: string;
  grossPay: number;
  tax: number;
  netPay: number;
}

const Payruns: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);

  const handleGenerate = async () => {
    const data = await createPayrun([
      { employeeId: "E001", hoursWorked: 40, hourlyRate: 25 },
      { employeeId: "E002", hoursWorked: 38, hourlyRate: 30 },
      { employeeId: "E003", hoursWorked: 42, hourlyRate: 28 },
    ]);
    setResults(data);
  };

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-fadeIn">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Payrun Results</h2>
      <button
        onClick={handleGenerate}
        className="mb-6 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
      >
        ⚙️ Generate Payrun
      </button>

      {results.length > 0 && (
        <table className="w-full text-center border border-blue-200 rounded-xl overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Employee ID</th>
              <th className="p-3">Gross Pay</th>
              <th className="p-3">Tax</th>
              <th className="p-3">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.employeeId} className={`${i % 2 ? "bg-blue-50" : "bg-white/70"}`}>
                <td className="p-3">{r.employeeId}</td>
                <td className="p-3">${r.grossPay}</td>
                <td className="p-3">${r.tax}</td>
                <td className="p-3 font-semibold text-green-700">${r.netPay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payruns;
