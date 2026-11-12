import express from 'express';
import UserController from '../controllers/userController.mjs';


const userRouter= express.Router();


userRouter
.get("/", UserController.getUsers)

.get("/:id",  UserController.showSingleUser)
.post("/signup",  UserController.Signup)
.post("/login",  UserController.Login)
.post("/send-email",  UserController.sendEmail)


export default userRouter;


