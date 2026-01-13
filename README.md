# 🎬 AI Movie Recommendation System

A modern, full‑stack web application that uses **Artificial Intelligence** to recommend movies based on your **mood**, **genre preferences**, or **free‑text descriptions**. Built for speed, reliability, and clean UX — even when the AI quota taps out.

---

## ✨ Highlights

* **🤖 AI‑Powered Recommendations**
  Uses OpenAI’s **GPT‑3.5‑Turbo** to generate contextual, human‑like movie suggestions.

* **🛡️ Smart Fallback (Mock Mode)**
  If the AI API fails, exceeds quota, or is unavailable, the app **automatically switches to Mock Mode** with curated, high‑quality movie recommendations — zero downtime.

* **💎 Premium UI / UX**
  Glassmorphism design, dark gradients, neon accents, and smooth animations for a modern feel.

* **💾 Persistent History**
  Every recommendation request and response is stored in **MongoDB** for tracking and analytics.

* **⚡ High Performance Stack**
  Vite + Fastify = fast builds, fast APIs, fast vibes.

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* CSS3 (Variables, Flexbox/Grid, Animations)

### Backend

* Node.js
* Fastify
* OpenAI API SDK
* Mongoose (MongoDB ODM)

### Database

* MongoDB (Local or Atlas)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### ✅ Prerequisites

* Node.js **v16+**
* MongoDB (Local instance or MongoDB Atlas URI)

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Adityaagarwal12345/movie-recommendation-system.git
cd movie-recommendation-system
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/movie-recommender
OPENAI_API_KEY=your_openai_api_key_here
```

> ⚠️ **No API key? No problem.**
> The application will automatically run in **Mock Mode**.

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

## 🧠 How It Works

1. User enters mood / genre / description
2. Request is sent to Fastify backend
3. Backend calls OpenAI API
4. AI generates movie recommendations
5. Results are saved to MongoDB
6. UI displays recommendations with animations

**Fallback Flow:**

* If OpenAI fails → Mock Mode activates automatically
* User still gets recommendations
* App never breaks

---

## 📂 Project Structure

```text
movie-recommendation-system/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # App pages
│   │   └── index.css      # Global styles & theme
│   └── ...
│
├── server/                # Fastify Backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── services/          # AI & Mock logic
│   └── index.js           # Server entry point
│
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome.

* Fork the repository
* Create a new branch
* Commit your changes
* Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🌟 Final Note

This project is designed to be **production‑safe**, **interview‑ready**, and **scalable**.
If you’re building AI‑powered products, this is a solid foundation — not a toy demo.

If you liked it, drop a ⭐ on the repo. It helps more than you think 🙌
