import express from "express";
import { loginUser, registerUser, AllUsers } from "../controllers/userController.js"; // Import AllUsers

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/all-users", AllUsers); // Use AllUsers (not getAllUsers)

export default userRouter;
