import { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Service } from "../entities/Service"
import { PropertyService } from "../services/hotelService"
import { UserService } from "../services/userService"
import { ContractStatus } from "../types"

const serviceRepository = AppDataSource.getRepository(Service)
const userService = new UserService()
const propertyService = new PropertyService()

export const getServices = async (req: Request, res: Response) => {
	try {
		const services = await serviceRepository.find()
		const enrichedContracts = await Promise.all(
			services.map(async service => {
				const agent = await userService.getUserById(service.AgentID)
				const client = await userService.getUserById(service.ClientID)
				const apartment = await propertyService.getApartmentById(
					service.ApartmentID
				)

				return {
					...service,
					agent,
					client,
					apartment,
				}
			})
		)

		res.json({
			success: true,
			data: enrichedContracts,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

export const getServiceById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const service = await serviceRepository.findOne({
			where: { ContractID: parseInt(id) },
		})

		if (!service) {
			return res.status(404).json({ message: "Contract not found" })
		}

		// Enrich contract with user and apartment data
		const agent = await userService.getUserById(service.AgentID)
		const client = await userService.getUserById(service.ClientID)
		const apartment = await propertyService.getApartmentById(
			service.ApartmentID
		)

		const enrichedContract = {
			...service,
			agent,
			client,
			apartment,
		}

		res.json({
			success: true,
			data: enrichedContract,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

export const createService = async (req: Request, res: Response) => {
	try {
		const { AgentID, ClientID, ApartmentID, startDate, endDate } = req.body

		// Validate that users and apartment exist
		const agent = await userService.getUserById(AgentID)
		const client = await userService.getUserById(ClientID)
		const apartment = await propertyService.getApartmentById(ApartmentID)

		if (!agent || !client || !apartment) {
			return res
				.status(400)
				.json({ message: "Invalid agent, client, or apartment" })
		}

		const service = new Service()
		service.AgentID = AgentID
		service.ClientID = ClientID
		service.ApartmentID = ApartmentID
		service.Status = ContractStatus.PENDING
		service.startDate = startDate ? new Date(startDate) : null
		service.endDate = endDate ? new Date(endDate) : null

		await serviceRepository.save(service)

		res.status(201).json({
			success: true,
			data: service,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

export const updateServiceStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { Status } = req.body

		const service = await serviceRepository.findOne({
			where: { ContractID: parseInt(id) },
		})

		if (!service) {
			return res.status(404).json({ message: "Contract not found" })
		}

		service.Status = Status
		await serviceRepository.save(service)

		res.json({
			success: true,
			data: service,
		})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}
