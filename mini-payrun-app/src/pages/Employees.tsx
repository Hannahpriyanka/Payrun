import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => console.error("Failed to load employees"));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-300">Employees 👩‍💼</h2>
      {employees.length === 0 ? (
        <p className="text-gray-400">No employees found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp: any) => (
            <div key={emp.id} className="bg-[#1e2a47] p-5 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition">
              <h3 className="text-lg font-semibold text-blue-300">{emp.name}</h3>
              <p className="text-gray-300">Role: {emp.role}</p>
              <p className="text-gray-400 text-sm">Rate: £{emp.hourlyRate}/hr</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
