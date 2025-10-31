import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const cards = [
    { title: "Create Payrun", desc: "Generate new payruns easily.", action: () => navigate("/payruns") },
    { title: "View Employees", desc: "Check employee details.", action: () => navigate("/employees") },
    { title: "Payslips", desc: "View or download payslips.", action: () => navigate("/payslips") },
    { title: "Reports", desc: "View payrun summary reports.", action: () => navigate("/reports") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white flex flex-col items-center py-12 px-6">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-10 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to Dashboard 🚀
      </motion.h1>
      <p className="text-gray-300 mb-10 text-center">
        Manage payruns, employees, and reports all in one place.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            onClick={card.action}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-2xl p-6 cursor-pointer border border-white/20 transition-all hover:scale-105 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-3">{card.title}</h2>
            <p className="text-gray-300 text-sm mb-4">{card.desc}</p>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
              Go →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
