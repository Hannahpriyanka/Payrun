import { useState, useEffect } from "react";
import axios from "axios";

export default function PayrunsPage() {
  const [payruns, setPayruns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayruns = () => {
    axios.get("http://localhost:4000/api/payruns")
      .then((res) => setPayruns(res.data))
      .catch(() => console.error("Failed to load payruns"));
  };

  useEffect(() => {
    fetchPayruns();
  }, []);

  const generatePayrun = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:4000/api/payruns");
      fetchPayruns();
    } catch {
      console.error("Error creating payrun");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-300">Payruns 💰</h2>
      <button
        onClick={generatePayrun}
        disabled={loading}
        className="mb-6 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium shadow-lg disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Payrun"}
      </button>

      {payruns.length === 0 ? (
        <p className="text-gray-400">No payruns yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1b2b4a] text-gray-300">
                <th className="p-3">ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {payruns.map((p: any) => (
                <tr key={p.id} className="border-b border-gray-700 hover:bg-[#16213d] transition">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">£{p.totalAmount?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
