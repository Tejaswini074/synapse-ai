import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
dotenv.config();
import authRoutes from "./routes/authRoute.js";
import chatRoutes from "./routes/chatRoute.js";



const app = express();

app.use(cors());
app.use(express.json());

// connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (_req, res) => {
  res.send("Synapse AI API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});