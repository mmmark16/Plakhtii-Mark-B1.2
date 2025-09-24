import { DataSource } from "typeorm"
import { Service } from "../entities/Service"

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "contract_database.sqlite",
	synchronize: true,
	logging: false,
	entities: [Service],
	migrations: [],
	subscribers: [],
})
