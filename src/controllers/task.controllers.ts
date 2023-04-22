/** Libraries */
import { type Request, type Response } from 'express'

/** Services */
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  setTaskAsCompletedService,
  deleteTaskService,
} from '../services/task.services'

/** Utils */
import { handleError } from '../utils'
import { type Filter, type Order } from '../utils/types'

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { filter, order, limit, skip } = req.params
  const data = await getTasksService(
    filter as Filter,
    order as Order,
    Number(limit),
    Number(skip)
  )
  if (data == null) {
    handleError(res, 'Request failed', {}, 403)
    return
  }
  res.status(200).json({
    message: 'tasks from database',
    tasks: data,
  })
}

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title } = req.body
  const data = await createTaskService(title)
  if (data == null) {
    handleError(res, 'Request failed', {}, 403)
    return
  }
  res.status(200).json({
    message: 'task created',
    task: data,
  })
}

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title } = req.body
  const { id } = req.params
  const data = await updateTaskService(title, id)
  if (data == null) {
    handleError(res, 'Request failed', {}, 403)
    return
  }
  res.status(200).json({
    message: 'task updated',
    task: data,
  })
}

export const setTaskAsCompleted = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const data = await setTaskAsCompletedService(id)
  if (data == null) {
    handleError(res, 'Request failed', {}, 403)
    return
  }
  res.status(200).json({
    message: 'task completed',
    task: data,
  })
}

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const data = await deleteTaskService(id)
  if (data == null) {
    handleError(res, 'Request failed', {}, 403)
    return
  }
  res.status(200).json({
    message: 'task deleted',
    task: data,
  })
}
