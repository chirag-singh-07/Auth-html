import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import connectDB from "./utils/database.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend")));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});



app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "pages", "dashboard.html"));
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' data: https://fonts.gstatic.com"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("API is running....");
});
app.use("/api/auth", UserRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
