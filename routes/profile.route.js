import express from "express"
import checkSession from "../middleware/authorization.middleware.js"
import profileController from "../controllers/profile.controller.js"

const router = express.Router()


router.get("/", checkSession, profileController)

export default router;