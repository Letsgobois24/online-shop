# 🛍️ Online Shop Marketplace

A cutting-edge E-Commerce platform built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**. This project features a robust hybrid architecture (Server & Client Components), secure authentication with Google OAuth support, and real-time payment processing via Midtrans.

![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![React 19](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Admin-orange?style=flat&logo=firebase)
![Midtrans](https://img.shields.io/badge/Payment-Midtrans-blueviolet)

## ✨ Key Features

This application offers a complete marketplace ecosystem with role-based access control (Visitor, Member, Admin).

### 🛒 Public & Shopping Experience
* **High-Performance Catalog:** Server-side rendered product pages for optimal SEO and speed.
* **Smart Search & Filtering:** Easily find products based on categories and names.
* **Interactive Shopping Cart:** Real-time state management (add, remove, update quantity) using React Hooks.
* **Seamless Checkout:** Integrated flow from cart review to payment.
* **Responsive UI:** Mobile-first design using Tailwind CSS v4 and Swiper.js for touch-friendly sliders.

### 🔐 Authentication & Security
* **Hybrid Authentication:** Support for **Google OAuth** (One-tap login) and Traditional Email/Password (Credentials).
* **Secure Session:** Powered by **NextAuth.js** with JWT strategy.
* **Data Protection:** Passwords are hashed using **Bcrypt**.

### 👤 Member Area
* **User Dashboard:** Overview of account activity.
* **Order Tracking:** Real-time status updates on purchases.
* **Transaction History:** Detailed logs of past payments.
* **Profile Management:** Update personal details and shipping addresses.

### 🛡️ Admin Panel
* **Admin Dashboard:** Visual statistics of sales, users, and orders.
* **Product Management:** Create, Read, Update, and Delete (CRUD) products.
* **Order Management:** View incoming orders and update shipping status.
* **User Management:** Manage registered users and roles.

---

## 🛠️ Tech Stack

Built with the latest web technologies based on `package.json`:

### Core & Framework
* **[Next.js 15.5](https://nextjs.org/):** Leveraging the App Router and React Server Components.
* **[React 19.1](https://react.dev/):** The latest React library with concurrent features.
* **[TypeScript](https://www.typescriptlang.org/):** Strongly typed codebase for scalability.

### Styling
* **[Tailwind CSS v4](https://tailwindcss.com/):** Next-generation utility-first CSS engine.
* **[Swiper](https://swiperjs.com/):** Modern touch slider for product banners.

### Backend & Database
* **[Firebase Admin SDK](https://firebase.google.com/):** Serverless backend interaction.
* **[Axios](https://axios-http.com/):** Promise-based HTTP client.

### Authentication
* **[NextAuth.js](https://next-auth.js.org/):** Complete open-source authentication solution.
* **Google OAuth:** Social login provider.

### Payment Gateway
* **[Midtrans Client](https://midtrans.com/):** Secure payment processing integration.

### Dev Tools
* **Turbopack:** High-performance bundler (used in `next dev`).
* **Husky & Lint-staged:** Git hooks to ensure code quality before commits.
* **ESLint:** Pluggable linting utility.

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone [https://github.com/username/online-shop.git](https://github.com/username/online-shop.git)
cd online-shop
```

### 2.  Install dependencies
```bash
npm install
```
### 3. Environment Variables
Create a .env / .env.local file in the root directory and configure the following keys:
```bash
# --- NextAuth Configuration ---
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_random_secret_string

# --- Google OAuth (For Google Login) ---
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret

# --- Firebase Admin SDK ---
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# --- Midtrans Payment Gateway ---
MIDTRANS_SERVER_KEY=your_sb_mid_server_key
MIDTRANS_CLIENT_KEY=your_sb_mid_client_key
NEXT_PUBLIC_MIDTRANS_MERCHANT_ID=your_merchant_id
NEXT_PUBLIC_MIDTRANS_SNAP_URL=your_snap_url
```

### 4.  Run Development Server
This project uses Turbopack for instant HMR (Hot Module Replacement).
```bash
npm run dev
```
Open `http://localhost:3000` (or the port shown in your terminal) with your browser to see the result.

---

## 🛠️ **Available Scripts**

| Script               | Command   | Description                    |
| ----------------------- | --------------- | --------------------------- |
| ```dev```| ```npm run dev``` | Starts the development server with Turbopack |
| ```build```| ```npm run build``` | Builds the application for production usage |
| ```start```| ```npm run start``` | Runs the built application in production mode |
| ```lint```| ```npm run lint``` | Runs ESLint to catch code errors |
| ```prepare```| ```npm run prepare``` | Sets up Husky git hooks |
---