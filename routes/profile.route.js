import express from "express"
import CheckSession from "../middleware/authorization.middleware.js"
const router = express.Router()


router.get("/profile", CheckSession,(req, res) => {
  
})

export default router;