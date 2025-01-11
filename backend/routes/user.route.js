import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.middleware.js";

const router = express.Router()

//Routes

router.route("/register").post(singleUpload,register);
router.route("/login").post(login)
router.route("/logout").get(logout)

//Safe route

router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile)

export default router;