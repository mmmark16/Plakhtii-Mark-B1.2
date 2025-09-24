import { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Apartment } from "../entities/Apartment"
import { Hotel } from "../entities/Hotel"

const hotelRepository = AppDataSource.getRepository(Hotel)
const apartmentRepository = AppDataSource.getRepository(Apartment)

export const getHotels = async (req: Request, res: Response) => {
	try {
		const hotels = await hotelRepository.find({
			relations: ["Apartments"],
		})

		res.json({
			success: true,
			data: hotels,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
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

		res.json({
			success: true,
			data: hotel,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

export const createHotel = async (req: Request, res: Response) => {
	try {
		const { City, Street, Number, Type, Description, Photo } = req.body

		const hotel = new Hotel()
		hotel.City = City
		hotel.Street = Street
		hotel.Number = Number
		hotel.Type = Type
		hotel.Description = Description
		hotel.Photo = Photo

		await hotelRepository.save(hotel)

		res.status(201).json({
			success: true,
			data: hotel,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

export const getApartments = async (req: Request, res: Response) => {
	try {
		const apartments = await apartmentRepository.find({
			relations: ["Building"],
		})

		res.json({
			success: true,
			data: apartments,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

export const getApartmentById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const apartment = await apartmentRepository.findOne({
			where: { ApartmentID: parseInt(id) },
			relations: ["Building"],
		})

		if (!apartment) {
			return res.status(404).json({ message: "Apartment not found" })
		}

		res.json({
			success: true,
			data: apartment,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

export const createApartment = async (req: Request, res: Response) => {
	try {
		const { Number, Square, Description, Photo, Cost, BuildingID } = req.body

		const hotel = await hotelRepository.findOne({
			where: { BuildingID: parseInt(BuildingID) },
		})

		if (!hotel) {
			return res.status(404).json({ message: "Building not found" })
		}

		const apartment = new Apartment()
		apartment.Number = Number
		apartment.Square = Square
		apartment.Description = Description
		apartment.Photo = Photo
		apartment.Cost = Cost
		apartment.Building = hotel

		await apartmentRepository.save(apartment)

		res.status(201).json({
			success: true,
			data: apartment,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}
