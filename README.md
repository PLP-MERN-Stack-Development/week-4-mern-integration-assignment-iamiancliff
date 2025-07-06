# 📝 MERN Blog Application

Welcome to the **MERN Blog App** — a full-stack blogging platform built with **MongoDB, Express.js, React, and Node.js**.

This is more than just a blog. It’s a platform where users can:

🚀 Create, read, update, and delete blog posts  
🛡 Authenticate securely with JWT  
🖼 Upload images  
💬 Comment on posts  
💡 Explore a modern UI with Tailwind CSS v4.1  

---

## ✨ Features

- ✅ **Modern Front-End** with React + Tailwind CSS
- 🌐 **RESTful API** using Express.js
- 🧠 **MongoDB/Mongoose** for flexible data storage
- 🛂 **User Authentication** (JWT)
- 📥 **Image Uploads** with `multer`
- 💬 **Comment System**
- 🔄 **Full CRUD** for blog posts
- 🧱 **Reusable component architecture**
- 🌈 Clean design, responsive UI

---

## 🛠️ Technologies Used

| Tech        | Description                  |
|-------------|------------------------------|
| React       | Front-end library (hooks, routing) |
| Tailwind CSS| Utility-first styling        |
| Express.js  | Back-end API server          |
| MongoDB     | NoSQL database with Mongoose |
| JWT         | Authentication/Authorization |
| Multer      | File upload middleware       |
| PNPM        | Package manager              |

---

## 📁 Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

### 2. Set Up the Server

```bash
cd server
pnpm install
```

Create a `.env` file in `/server` and add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
pnpm run dev
```

---

### 3. Set Up the Client

Open a second terminal tab:

```bash
cd client
pnpm install
pnpm run dev
```

Visit the app: [http://localhost:5173](http://localhost:5173)

---

## 🧪 API Overview (Sample Routes)

| Method | Route              | Description           |
|--------|-------------------|-----------------------|
| POST   | /api/auth/register | Register a new user   |
| POST   | /api/auth/login    | Authenticate user     |
| GET    | /api/posts         | Get all posts         |
| POST   | /api/posts         | Create a new post     |
| PUT    | /api/posts/:id     | Update a post         |
| DELETE | /api/posts/:id     | Delete a post         |

---

## 🙌 Contributions

Contributions are welcome! Open an issue, fork the repo, and submit a pull request.

---

## 🛡 License

MIT License — feel free to use, share, and build on it.

---

## 📣 Shout-out

Built with ❤️ by Ian Cliff