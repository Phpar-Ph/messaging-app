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

const PORT = process.env.PORT;
connectDB();
const __dirname = path.resolve()
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
