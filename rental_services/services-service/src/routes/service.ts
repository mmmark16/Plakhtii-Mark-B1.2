import { Router } from "express"
import {
	createService,
	getServiceById,
	getServices,
	updateServiceStatus,
} from "../controllers/contractController"

const router = Router()

// Contract routes
router.get("/", getServices)
router.get("/:id", getServiceById)
router.post("/", createService)
router.patch("/:id/status", updateServiceStatus)

export default router
