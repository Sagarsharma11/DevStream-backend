import {Router} from "express";
const router = Router();
import {userRegisterValidation} from "../validations/user.validation.js"

import {userRegister, userLogin} from "../controllers/user.controller.js";

router.route("/register").post(userRegisterValidation,userRegister);
router.route("/login").post(userLogin);


export default router;