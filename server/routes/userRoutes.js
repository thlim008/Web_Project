import { Router } from "express";
import{userSigninController, userSignUpController} from "../controllers/userControllers"
const router = Router();

router.post('/signUp', userSignUpController);

router.post('/signin', userSigninController);

export default router;