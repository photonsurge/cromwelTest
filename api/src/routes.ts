import { Router } from "express";
import userRouter from "./routes/user";




let router = Router();
router.use('/api/users', userRouter)


export default router;