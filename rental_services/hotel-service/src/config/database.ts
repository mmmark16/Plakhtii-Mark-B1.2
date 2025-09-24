import { DataSource } from "typeorm"
import { Apartment } from "../entities/Apartment"
import { Hotel } from "../entities/Hotel"

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "property_database.sqlite",
	synchronize: true,
	logging: false,
	entities: [Hotel, Apartment],
	migrations: [],
	subscribers: [],
})
