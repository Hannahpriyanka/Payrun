import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import payrunRoutes from "./routes/payruns";
import employeeRoutes from "./routes/employees";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Mini Payrun API is running!");
});

app.use("/api/payruns", payrunRoutes);
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
