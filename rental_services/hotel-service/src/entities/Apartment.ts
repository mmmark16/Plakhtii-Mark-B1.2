import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Hotel } from "./Hotel"

/**
 * @swagger
 * components:
 *   schemas:
 *     Apartment:
 *       type: object
 *       properties:
 *         ApartmentID:
 *           type: integer
 *         Number:
 *           type: integer
 *         Square:
 *           type: integer
 *         Description:
 *           type: string
 *         Photo:
 *           type: string
 *         Cost:
 *           type: integer
 *         Building:
 *           $ref: '#/components/schemas/Building'
 */

@Entity("apartments")
export class Apartment {
	@PrimaryGeneratedColumn("increment")
	ApartmentID!: number

	@Column({ type: "int" })
	Number!: number

	@Column({ type: "int" })
	Square!: number

	@Column({ type: "varchar", length: 255, nullable: true })
	Description!: string

	@Column({ type: "varchar", length: 255, nullable: true })
	Photo!: string

	@Column({ type: "int" })
	Cost!: number

	@ManyToOne(() => Hotel, building => building.Apartments)
	Building!: Hotel
}
