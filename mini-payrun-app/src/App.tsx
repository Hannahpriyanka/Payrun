import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Timesheets from "./pages/Timesheets";
import Payruns from "./pages/Payruns";
import Payslips from "./pages/Payslips";

const App: React.FC = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Employees":
        return <Employees />;
      case "Timesheets":
        return <Timesheets />;
      case "Payruns":
        return <Payruns />;
      case "Payslips":
        return <Payslips />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 flex flex-col">
      <header className="backdrop-blur-md bg-white/20 text-white shadow-lg sticky top-0 z-50">
        <div className="flex justify-between items-center px-10 py-4">
          <h1 className="text-3xl font-bold drop-shadow-lg">💼 Mini Payrun App</h1>
          <nav className="space-x-6 text-lg">
            {["Dashboard", "Employees", "Timesheets", "Payruns", "Payslips"].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`transition-all duration-300 px-3 py-1 rounded-lg hover:bg-white/20 ${
                  activePage === page ? "bg-white/30 font-semibold" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 p-10">
        <div className="max-w-6xl mx-auto">{renderPage()}</div>
      </main>

      <footer className="text-center text-white/70 py-4 text-sm">
        © 2025 Mini Payrun App • Built with ❤️ using React + TypeScript
      </footer>
    </div>
  );
};

export default App;
