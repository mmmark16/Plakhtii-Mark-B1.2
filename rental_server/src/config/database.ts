import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { Apartment } from "../entities/Apartment"
import { Hotel } from "../entities/Hotel"
import { Service } from "../entities/Service"
import { User } from "../entities/User"

dotenv.config()

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: process.env.DATABASE_PATH || "./database.sqlite",
	synchronize: true,
	logging: process.env.NODE_ENV === "development",
	entities: [User, Apartment, Hotel, Service],
	subscribers: [],
	migrations: [],
})

export const initializeDatabase = async () => {
	try {
		await AppDataSource.initialize()
		console.log("Database connection established")
	} catch (error) {
		console.error("Error connecting to database:", error)
		process.exit(1)
	}
}
