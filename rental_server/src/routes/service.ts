/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: Управление контрактами
 */

import { Router } from "express"
import {
	createService,
	deleteService,
	getAllServices,
	getServiceById,
	updateService,
} from "../controllers/serviceController"
import { authMiddleware } from "../middleware/auth"

const router = Router()

/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Получить все контракты
 *     tags: [Contracts]
 *     responses:
 *       200:
 *         description: Список контрактов
 */
router.get("/", getAllServices)

/**
 * @swagger
 * /contracts/{id}:
 *   get:
 *     summary: Получить контракт по ID
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID контракта
 *     responses:
 *       200:
 *         description: Данные контракта
 *       404:
 *         description: Контракт не найден
 */
router.get("/:id", getServiceById)

/**
 * @swagger
 * /contracts:
 *   post:
 *     summary: Создать контракт
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contract'
 *     responses:
 *       201:
 *         description: Контракт создан
 */
router.post("/", authMiddleware, createService)

/**
 * @swagger
 * /contracts/{id}:
 *   put:
 *     summary: Обновить контракт
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID контракта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contract'
 *     responses:
 *       200:
 *         description: Контракт обновлен
 */
router.put("/:id", authMiddleware, updateService)

/**
 * @swagger
 * /contracts/{id}:
 *   delete:
 *     summary: Удалить контракт
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID контракта
 *     responses:
 *       200:
 *         description: Контракт удален
 */
router.delete("/:id", authMiddleware, deleteService)

export default router
