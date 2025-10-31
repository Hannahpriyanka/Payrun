import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api";

export default function Payruns() {
  const [payruns, setPayruns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPayruns = async () => {
    try {
      const res = await axios.get(`${API_URL}/payruns`);
      setPayruns(res.data);
    } catch (err) {
      console.error("Error fetching payruns:", err);
    }
  };

  const handleGeneratePayrun = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/payruns`);
      console.log("Payrun generated:", res.data);
      await fetchPayruns();
    } catch (err) {
      console.error("Error generating payrun:", err);
      alert("Failed to generate payrun. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayruns();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Payruns</h1>
      <button
        onClick={handleGeneratePayrun}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
      >
        {loading ? "Generating..." : "Generate Payrun"}
      </button>

      {payruns.length === 0 ? (
        <p className="mt-4 text-gray-300">No payruns yet.</p>
      ) : (
        payruns.map((p) => (
          <div key={p.id} className="bg-blue-900/50 p-4 mt-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Payrun #{p.id}</h2>
            <p className="text-gray-300 mb-3">
              Gross: ${p.totalsGross.toFixed(2)} | Net: ${p.totalsNet.toFixed(2)}
            </p>
            <h3 className="text-lg font-semibold mb-2">Payslips:</h3>
            {p.payslips.map((s: any) => (
              <div key={s.employeeId} className="bg-blue-800/50 p-3 mb-3 rounded-lg">
                <p className="font-semibold">
                  {s.employeeName} — ${s.gross.toFixed(2)} gross / ${s.net.toFixed(2)} net
                </p>
                <p className="text-gray-400 text-sm">
                  Tax: ${s.tax.toFixed(2)} | Super: ${s.super.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
