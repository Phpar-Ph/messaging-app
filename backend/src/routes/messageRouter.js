import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controller/messageController.js";
const messageRouter = express.Router();


messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessage);
export default messageRouter;
