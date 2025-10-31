
---

## 🧠 3️⃣ `DECISIONS.md`
📄 **Path:** `Payroo/DECISIONS.md`
```markdown
# 🧠 Design & Implementation Decisions

This document records key technical decisions taken while developing the Mini Payrun App.

---

## 1️⃣ Architecture
- **Two-tier app** (API + React frontend)
- API handles business logic and data persistence
- Frontend fetches from API and renders state-driven UI

---

## 2️⃣ Backend (API)
- Framework: **Express (TypeScript)**
- ORM: **Prisma**
- Database: **SQLite** (local), easy to replace with PostgreSQL in AWS
- Routes:
  - `/api/employees`
  - `/api/timesheets`
  - `/api/payruns`

---

## 3️⃣ Frontend
- Framework: **React + TypeScript + Vite**
- Styling: **Tailwind CSS**
- State management: **React Hooks**
- Routing: **React Router**
- API calls: **Axios**
- Layout includes:  
  - Navigation bar (Employees | Timesheets | Payruns)  
  - Payrun generator button  
  - Responsive design for desktop/mobile  

---

## 4️⃣ Deployment
- **Frontend** via AWS Amplify (build + auto-deploy on commit)
- **Backend** via AWS Lambda / EC2
- Environment variables stored securely via AWS Systems Manager

---

## 5️⃣ Future Improvements
- Add authentication (JWT)
- Connect to persistent RDS
- Add pagination and filtering
- Use GraphQL instead of REST (optional)

---

## ✅ Summary
This version is stable, minimal, and fulfills Payroo’s core functionality for employee management, timesheets, and payrun generation.
