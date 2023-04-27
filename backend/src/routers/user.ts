import { Router } from "express";
import { getCurrentUser } from "../controllers/userController";

const router:Router = Router()

router.route('/')
    .get(getCurrentUser)


export default router