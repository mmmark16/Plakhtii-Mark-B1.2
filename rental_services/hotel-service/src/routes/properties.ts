import { Router } from "express"
import {
	createApartment,
	createHotel,
	getApartmentById,
	getApartments,
	getHotelById,
	getHotels,
} from "../controllers/propertyController"

const router = Router()

router.get("/buildings", getHotels)
router.get("/buildings/:id", getHotelById)
router.post("/buildings", createHotel)

router.get("/apartments", getApartments)
router.get("/apartments/:id", getApartmentById)
router.post("/apartments", createApartment)

export default router
