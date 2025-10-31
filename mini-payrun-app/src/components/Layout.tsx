import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      <motion.nav
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="title">💼 Mini Payrun App</h1>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/employees">Employees</Link></li>
          <li><Link to="/timesheets">Timesheets</Link></li>
          <li><Link to="/payruns">Payruns</Link></li>
          <li><Link to="/payslips">Payslips</Link></li>
        </ul>
      </motion.nav>
      <main className="content">{children}</main>
    </div>
  );
}
