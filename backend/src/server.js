import express from "express";
import authRouter from "./routes/authRouter.js";
import messageRouter from "./routes/messageRouter.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "../src/config/socket.js";
import path from "path";

dotenv.config();
connectDB();
const PORT = process.env.PORT;

const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
