import { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Hotel } from "../entities/Hotel"

const hotelRepository = AppDataSource.getRepository(Hotel)

export const getAllHotels = async (req: Request, res: Response) => {
	try {
		const hotels = await hotelRepository.find({
			relations: ["Apartments"],
		})
		res.json(hotels)
	} catch (error) {
		res.status(500).json({ message: "Error fetching buildings", error })
	}
}

export const getHotelById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const hotel = await hotelRepository.findOne({
			where: { BuildingID: parseInt(id) },
			relations: ["Apartments"],
		})

		if (!hotel) {
			return res.status(404).json({ message: "Building not found" })
		}

		res.json(hotel)
	} catch (error) {
		res.status(500).json({ message: "Error fetching building", error })
	}
}

export const createHotel = async (req: Request, res: Response) => {
	try {
		const { City, Street, Number, Type, Description, Photo } = req.body

		const hotels = hotelRepository.create({
			City,
			Street,
			Number,
			Type,
			Description,
			Photo,
		})

		const savedHotel = await hotelRepository.save(hotels)
		res.status(201).json(savedHotel)
	} catch (error) {
		res.status(500).json({ message: "Error creating building", error })
	}
}

export const updateHotel = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const updateData = req.body

		await hotelRepository.update(id, updateData)
		const updatedHotel = await hotelRepository.findOne({
			where: { BuildingID: parseInt(id) },
			relations: ["Apartments"],
		})

		res.json(updatedHotel)
	} catch (error) {
		res.status(500).json({ message: "Error updating building", error })
	}
}

export const deleteHotel = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		await hotelRepository.delete(id)
		res.json({ message: "Building deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: "Error deleting building", error })
	}
}
