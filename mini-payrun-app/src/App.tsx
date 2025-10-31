import { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
  id: number;
  name: string;
  hourlyRate: number;
}

interface Timesheet {
  id: number;
  employeeId: number;
  hoursWorked: number;
  date: string;
}

interface Payslip {
  employeeId: number;
  employeeName: string;
  gross: number;
  net: number;
  tax: number;
  super: number;
}

interface Payrun {
  id: number;
  totals: {
    gross: number;
    net: number;
    tax: number;
    super: number;
  };
  payslips: Payslip[];
}

export default function App() {
  const [page, setPage] = useState<"start" | "dashboard">("start");
  const [tab, setTab] = useState<"employees" | "timesheets" | "payruns">("employees");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [payruns, setPayruns] = useState<Payrun[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:4000/api";

  useEffect(() => {
    if (page === "dashboard") {
      fetchData();
    }
  }, [page]);

  const fetchData = async () => {
    try {
      const [empRes, timeRes, payRes] = await Promise.all([
        axios.get(`${API_URL}/employees`),
        axios.get(`${API_URL}/timesheets`),
        axios.get(`${API_URL}/payruns`),
      ]);
      setEmployees(empRes.data);
      setTimesheets(timeRes.data);
      setPayruns(payRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGeneratePayrun = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/payruns/generate`);
      await fetchData();
    } catch (err) {
      console.error("Error generating payrun", err);
    } finally {
      setLoading(false);
    }
  };

  if (page === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-6">💼 Mini Payrun App</h1>
        <p className="text-lg text-gray-200 mb-8 text-center max-w-md">
          Generate payruns, manage employees and view payslips — all in one stylish dashboard.
        </p>
        <button
          onClick={() => setPage("dashboard")}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-2xl transition-all shadow-lg hover:scale-105"
        >
          Get Started 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-900 shadow-md">
        <h1 className="text-2xl font-bold">💼 Mini Payrun App</h1>
        <div className="flex gap-6">
          {["employees", "timesheets", "payruns"].map((tabName) => (
            <button
              key={tabName}
              className={`capitalize px-3 py-1 rounded-lg transition-all ${
                tab === tabName
                  ? "bg-blue-600 font-semibold"
                  : "hover:bg-blue-700 text-gray-300"
              }`}
              onClick={() => setTab(tabName as any)}
            >
              {tabName}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-8">
        {tab === "employees" && (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Employees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-blue-800 p-4 rounded-2xl shadow-lg border border-blue-700"
                >
                  <h3 className="text-xl font-bold">{emp.name}</h3>
                  <p className="text-gray-300">${emp.hourlyRate}/hr</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "timesheets" && (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Timesheets</h2>
            <div className="space-y-4">
              {timesheets.map((sheet) => {
                const emp = employees.find((e) => e.id === sheet.employeeId);
                return (
                  <div
                    key={sheet.id}
                    className="bg-blue-800 p-4 rounded-2xl shadow-lg border border-blue-700"
                  >
                    <h3 className="font-semibold">
                      {emp?.name || "Unknown"} — {sheet.hoursWorked} hrs
                    </h3>
                    <p className="text-gray-400">{sheet.date}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "payruns" && (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Payruns</h2>
            <button
              onClick={handleGeneratePayrun}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl mb-6 shadow-lg transition-all hover:scale-105"
            >
              {loading ? "Generating..." : "Generate Payrun"}
            </button>

            {payruns.length === 0 ? (
              <p className="text-gray-400">No payruns yet.</p>
            ) : (
              payruns.map((run) => (
                <div
                  key={run.id}
                  className="bg-blue-800 p-6 rounded-2xl mb-6 shadow-lg border border-blue-700"
                >
                  <h3 className="text-2xl mb-2">Payrun #{run.id}</h3>
                  <p>
                    <strong>Gross:</strong> ${run.totals.gross.toFixed(2)} |{" "}
                    <strong>Net:</strong> ${run.totals.net.toFixed(2)}
                  </p>
                  <h4 className="text-xl mt-4 mb-2">Payslips:</h4>
                  {run.payslips.map((p) => (
                    <div
                      key={p.employeeId}
                      className="bg-blue-700 p-3 rounded-xl mb-2 text-sm"
                    >
                      <p>
                        <strong>{p.employeeName}</strong> — ${p.gross.toFixed(2)} gross / ${p.net.toFixed(2)} net
                      </p>
                      <p>
                        Tax: ${p.tax.toFixed(2)} | Super: ${p.super.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
