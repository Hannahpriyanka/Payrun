import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

interface Employee {
  id: string;
  name: string;
  hourlyRate: number;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    load();
  }, []);

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-fadeIn">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6">Employees</h2>
      <table className="w-full text-center border border-blue-200 rounded-xl overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Hourly Rate</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, i) => (
            <tr key={e.id} className={`${i % 2 ? "bg-blue-50" : "bg-white/70"}`}>
              <td className="p-3">{e.id}</td>
              <td className="p-3">{e.name}</td>
              <td className="p-3">${e.hourlyRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
