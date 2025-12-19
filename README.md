#  Asset Management — Corporate Asset Handling System

A complete **HR & Employee-focused Asset Management Platform** that helps companies efficiently manage assets, employees, asset requests, and company packages with automation.

---

##  Live Links
| Type | Link |
|------|------|
| Live Client | [Demo](https://asset-managment-byzia.netlify.app) |


---

## Project Overview
Asset Management is a modern corporate system designed to track & manage physical assets like laptops, electronics, furniture, tools, and more.  
The system ensures accountability, transparency, and HR-controlled workflow automation.

---

# User Roles & Permissions

## HR Manager (Admin-Level)
- Add / Manage Assets  
- Approve / Reject Employee Requests  
- Directly assign assets to employees  
- Manage employees under the company  
- Track usage history  
- Upgrade package (Stripe payment)  
- View analytics dashboard  

## Employee
- Request assets  
- View assigned assets  
- Manage their team information  
- Return assets (if returnable)  
- Update profile  

---

# Key Features

## Asset Management
- Add new assets  
- Manage quantity  
- Edit & Delete  
- Filter & search  
- Auto-update quantity after request approval  

## Request Management
- Employees can request assets  
- HR reviews & approves/rejects  
- Auto assign & auto affiliate on first approval  
- Real-time updates  
- Request history tracking  

## Employee Management
- Auto-join company after first approved request  
- Employee limit based on subscription  
- Employee removal auto-returns assets  

## Subscription System
- Default free plan (limit 5 employees)  
- Premium plan increases employee limit  
- Stripe-integrated secure payment  

## Analytics (Recharts)
- Asset usage stats  
- Most requested assets  
- Returnable vs non-returnable chart  
- Employee growth visualizations  

---

# Tech Stack

## Frontend
- React.js  
- React Router  
- TailwindCSS  
- Axios  
- TanStack React Query  
- Firebase Authentication  
- Framer Motion  
- DaisyUI  

## Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT authentication  
- Stripe Payment Integration  

---

# Database Collections

| Collection | Purpose |
|-----------|----------|
| `users` | HR + Employee accounts |
| `employeeAffiliations` | Tracks employees under HR |
| `assets` | Asset inventory |
| `requests` | Asset requests |
| `assignedAssets` | Approved/assigned assets |
| `packages` | Subscription plans |
| `payments` | Stripe payment logs |

---

# Environment Variables

## **Client `.env`**
```env
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_SERVER_URL=
