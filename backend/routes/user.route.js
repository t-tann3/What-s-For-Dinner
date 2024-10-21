import { Router } from "express";
import { deleteUserById, getUserById, updateUserById,  } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.get('/users/:id', getUserById);

UserRouter.put('/users/:id', updateUserById);

UserRouter.delete('/users/:id', deleteUserById);



export default UserRouter;