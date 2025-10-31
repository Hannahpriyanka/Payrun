# 💼 Mini Payrun App

A mini payroll management system that simulates a simplified Payroo workflow — from managing employees and timesheets to generating pay runs and payslips.

---

## 🚀 Tech Stack

### **Backend (API)**
- Node.js (TypeScript)
- Express
- Prisma ORM
- SQLite (local) or PostgreSQL (AWS RDS)
- CORS, dotenv

### **Frontend**
- React (TypeScript + Vite)
- Tailwind CSS
- Axios
- React Router

### **Optional Deployment**
- AWS Amplify (Frontend)
- AWS Lambda / EC2 (Backend)
- AWS RDS (Database)

---

## 📂 Project Structure

Payroo/
├── api/ # Backend (Express + Prisma)
│ ├── prisma/
│ ├── src/
│ │ ├── routes/
│ │ └── index.ts
│ └── package.json
│
├── mini-payrun-app/ # Frontend (React + Vite)
│ ├── src/
│ ├── public/
│ └── package.json
│
├── .gitignore
├── README.md
└── DECISIONS.md


---

## 🧰 Setup

### **Backend**
```bash
cd api
npm install
npx prisma generate
npm run dev
