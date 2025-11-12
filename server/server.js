import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// 🟢 FRONTEND URL (for CORS)
const FRONTEND_URL = process.env.FRONTEND_URL; // default for Vite

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Setup CORS properly
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST"],
  credentials: true,
}));

// Connect DB
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not set in .env");
  process.exit(1);
}
connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Contact API running" });
});

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
  console.log(`🌐 CORS allowed for: ${FRONTEND_URL}`);
});