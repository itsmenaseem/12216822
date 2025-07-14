import express from "express"
import { getStats, shorten } from "../controllers/shortner.controller.js"

const router = express.Router()

router.route("/shorten").post(shorten)
router.route("/shorturls/:shortCode").get(getStats)

export default router