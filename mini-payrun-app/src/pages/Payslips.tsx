import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Payslip {
  id: number;
  employeeName: string;
  grossPay: number;
  tax: number;
  netPay: number;
  payrunId: number;
  createdAt: string;
}

const Payslips: React.FC = () => {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPayslips = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/payslips");
      setPayslips(res.data);
    } catch (err) {
      console.error("Error fetching payslips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayslips();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white p-10">
      <motion.h1
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🧾 Payslips
      </motion.h1>

      {loading ? (
        <div className="text-center text-lg text-gray-300">Loading payslips...</div>
      ) : payslips.length === 0 ? (
        <div className="text-center text-lg text-gray-300">No payslips available yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {payslips.map((slip, idx) => (
            <motion.div
              key={slip.id}
              className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:scale-[1.03] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <h2 className="text-xl font-semibold mb-3 text-blue-200">
                {slip.employeeName}
              </h2>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-300">Gross Pay:</span>{" "}
                  <span className="text-green-400 font-semibold">
                    £{slip.grossPay.toFixed(2)}
                  </span>
                </p>
                <p>
                  <span className="text-gray-300">Tax:</span>{" "}
                  <span className="text-red-400 font-semibold">
                    £{slip.tax.toFixed(2)}
                  </span>
                </p>
                <p>
                  <span className="text-gray-300">Net Pay:</span>{" "}
                  <span className="text-yellow-400 font-semibold">
                    £{slip.netPay.toFixed(2)}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Payrun ID:</span> {slip.payrunId}
                </p>
                <p className="text-gray-400 text-xs">
                  {new Date(slip.createdAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payslips;
