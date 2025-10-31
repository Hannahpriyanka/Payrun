import { useEffect, useState } from "react";
import axios from "axios";

export default function TimesheetsPage() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/timesheets")
      .then((res) => setTimesheets(res.data))
      .catch(() => console.error("Failed to load timesheets"));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-300">Timesheets ⏰</h2>
      {timesheets.length === 0 ? (
        <p className="text-gray-400">No timesheets yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1b2b4a] text-gray-300">
                <th className="p-3">Employee</th>
                <th className="p-3">Hours</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.map((t: any) => (
                <tr key={t.id} className="border-b border-gray-700 hover:bg-[#16213d] transition">
                  <td className="p-3">{t.employee?.name || "Unknown"}</td>
                  <td className="p-3">{t.hours}</td>
                  <td className="p-3">{new Date(t.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
