/** Libraries */
import { Router } from 'express'
import { check } from 'express-validator'

/** Controllers */
import {
  getTasks,
  createTask,
  updateTask,
  setTaskAsCompleted,
  deleteTask,
} from '../controllers/task.controllers'

/** Middlewares */
import { validateFields } from '../middleware'

/** Utils */
import { taskExists, taskIsntFinished } from '../utils'

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task management - endpoints
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: mongoId
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: Title of the task
 *         status:
 *           type: boolean
 *           description: If the task is completed it will be false
 *         createdAt:
 *           type: date
 *           description: Date when the task was created
 *       example:
 *         _id: 63b8c81f8f354ed7be8f77b7
 *         title: This is a task
 *         status: true
 *         createdAt: 2023-01-07T01:54:56.343Z
 */
const router = Router()

/**
 * @swagger
 * /task/{filter}/{order}/{limit}/{skip}:
 *   get:
 *     summary: Get tasks.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: filter
 *         example: all
 *       - in: path
 *         name: order
 *         example: asc
 *       - in: path
 *         name: limit
 *         example: 0
 *       - in: path
 *         name: skip
 *         example: 10
 *     responses:
 *       200:
 *         description: Get tasks was successful!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: tasks from database
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Task"
 *       400:
 *         description: Some server error
 *
 */
router.get(
  '/:filter/:order/:limit/:skip',
  [
    check('filter', '"filter" is required.').not().isEmpty(),
    check(
      'filter',
      '"filter" should be "all", "completed" or "uncompleted".'
    ).isIn(['all', 'completed', 'uncompleted']),
    check('order', '"order" is required.').not().isEmpty(),
    check('order', '"order" should be "asc" or "desc".').isIn(['asc', 'desc']),
    check('limit', '"limit" is required.').not().isEmpty(),
    check('skip', '"skip" is required.').not().isEmpty(),
    validateFields,
  ],
  getTasks
)

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create task.
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: This is a task
 *     responses:
 *       200:
 *         description: Task has been created successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: task created
 *                 task:
 *                   type: object
 *                   $ref: "#/components/schemas/Task"
 *       400:
 *         description: Some server error
 *
 */
router.post(
  '/',
  [
    check('title', '"title" is required.').not().isEmpty(),
    check('title', 'The title must have at least 6 length.').isLength({
      min: 6,
    }),
    check('title', 'The title cant be higher than 30 length.').isLength({
      max: 30,
    }),
    validateFields,
  ],
  createTask
)

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update task.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: mongoId of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: New title
 *     responses:
 *       200:
 *         description: Task has been updated successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 task:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63b8c81f8f354ed7be8f77b7
 *                     title:
 *                       type: string
 *                       example: New title
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: date
 *                       example: 2023-01-07T01:54:56.343Z
 *       400:
 *         description: Some server error
 *
 */
router.put(
  '/:id',
  [
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskExists),
    check('title', '"title" is required.').not().isEmpty(),
    check('title', 'The title must have at least 6 length.').isLength({
      min: 6,
    }),
    check('title', 'The title cant be higher than 30 length.').isLength({
      max: 30,
    }),
    validateFields,
  ],
  updateTask
)

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Set task as completed.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: mongoId of the task
 *     responses:
 *       200:
 *         description: Task has been marked as finished successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 task:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63b8c81f8f354ed7be8f77b7
 *                     title:
 *                       type: string
 *                       example: This is a task
 *                     status:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: date
 *                       example: 2023-01-07T01:54:56.343Z
 *       400:
 *         description: Some server error
 *
 */
router.patch(
  '/:id',
  [
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskIsntFinished),
    validateFields,
  ],
  setTaskAsCompleted
)

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete task.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: mongoId of the task
 *     responses:
 *       200:
 *         description: Task has been deleted successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 task:
 *                   type: object
 *                   $ref: "#/components/schemas/Task"
 *       400:
 *         description: Some server error
 *
 */
router.delete(
  '/:id',
  [
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskExists),
    validateFields,
  ],
  deleteTask
)

export { router as taskRouter }
