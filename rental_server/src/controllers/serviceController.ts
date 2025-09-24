import { Request, Response } from "express"
import { AppDataSource } from "../config/database"
import { Contract, ContractStatus } from "../entities/Service"

const serviceRepository = AppDataSource.getRepository(Contract)

export const getAllServices = async (req: Request, res: Response) => {
	try {
		const services = await serviceRepository.find({
			relations: ["AgentID", "ClientID", "ApartmentID"],
		})
		res.json(services)
	} catch (error) {
		res.status(500).json({ message: "Error fetching contracts", error })
	}
}

export const getServiceById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const service = await serviceRepository.findOne({
			where: { ContractID: parseInt(id) },
			relations: ["AgentID", "ClientID", "ApartmentID"],
		})

		if (!service) {
			return res.status(404).json({ message: "Contract not found" })
		}

		res.json(service)
	} catch (error) {
		res.status(500).json({ message: "Error fetching contract", error })
	}
}

export const createService = async (req: Request, res: Response) => {
	try {
		const { AgentID, ClientID, ApartmentID, Status, startDate, endDate } =
			req.body

		const service = serviceRepository.create({
			AgentID,
			ClientID,
			ApartmentID,
			Status: Status || ContractStatus.PENDING,
			startDate: startDate ? new Date(startDate) : undefined,
			endDate: endDate ? new Date(endDate) : undefined,
		})

		const savedService = await serviceRepository.save(service)
		res.status(201).json(savedService)
	} catch (error) {
		res.status(500).json({ message: "Error creating contract", error })
	}
}

export const updateService = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const updateData = req.body

		if (updateData.AgentID) {
			updateData.AgentID = { UserID: updateData.AgentID }
		}

		if (updateData.ClientID) {
			updateData.ClientID = { UserID: updateData.ClientID }
		}

		if (updateData.ApartmentID) {
			updateData.ApartmentID = { ApartmentID: updateData.ApartmentID }
		}

		if (updateData.startDate) {
			updateData.startDate = new Date(updateData.startDate)
		}

		if (updateData.endDate) {
			updateData.endDate = new Date(updateData.endDate)
		}

		await serviceRepository.update(id, updateData)
		const updatedService = await serviceRepository.findOne({
			where: { ContractID: parseInt(id) },
			relations: ["AgentID", "ClientID", "ApartmentID"],
		})

		res.json(updatedService)
	} catch (error) {
		res.status(500).json({ message: "Error updating contract", error })
	}
}

export const deleteService = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		await serviceRepository.delete(id)
		res.json({ message: "Contract deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: "Error deleting contract", error })
	}
}
