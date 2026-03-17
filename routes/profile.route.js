import express from "express"
import checkSession from "../middleware/authorization.middleware.js"
import profileController from "../controllers/profile.controller.js"
import asyncErrorHandler from "../utils/AsyncErrorHandler.js"

const router = express.Router()


router.get("/", checkSession, asyncErrorHandler(profileController))

export default router;