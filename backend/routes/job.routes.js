import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createJob, getAdminJob, getAllJob, getJobById } from "../controllers/job.controller.js";

const router = express.Router()

//Routes

router.route("/postJob").post(isAuthenticated,createJob)
router.route("/allJob").get(isAuthenticated,getAllJob)
router.route("/get/:id").get(isAuthenticated,getJobById)
router.route("/adminJob").get(isAuthenticated,getAdminJob)




export default router;