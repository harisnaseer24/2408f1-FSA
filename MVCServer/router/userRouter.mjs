import express from 'express';
import UserController from '../controllers/userController.mjs';


const userRouter= express.Router();


userRouter
.get("/", UserController.getUsers)

.get("/:id",  UserController.showSingleUser)
.post("/signup",  UserController.Signup)


export default userRouter;


