/** Models */
import TaskModel from '../models/task.model'

/** Interfaces / Types */
import {
  type Task,
  type GetTasksReturnType,
  type CreateTasksReturnType,
  type UpdateTasksReturnType,
  type SetTasksAsCompletedReturnType,
  type DeleteTasksReturnType,
} from '../interfaces/task.interface'

import { type Filter, type Order } from '../utils/types'

export const getTasksService = async (
  filter: Filter,
  order: Order,
  skip: number,
  limit: number
): Promise<GetTasksReturnType> => {
  if (filter === 'completed') {
    const tasks: Task[] = await TaskModel.find({ status: false })
      .sort({
        createdAt: order,
      })
      .skip(skip)
      .limit(limit)
    if (tasks == null) return null
    return tasks
  } else if (filter === 'uncompleted') {
    const tasks: Task[] = await TaskModel.find({ status: true })
      .sort({
        createdAt: order,
      })
      .skip(skip)
      .limit(limit)
    if (tasks == null) return null
    return tasks
  } else {
    const tasks: Task[] = await TaskModel.find()
      .sort({ createdAt: order })
      .skip(skip)
      .limit(limit)
    if (tasks == null) return null
    return tasks
  }
}

export const createTaskService = async (
  title: string
): Promise<CreateTasksReturnType> => {
  const newTask = new TaskModel({
    title,
    status: true,
    createdAt: new Date().getTime(),
  })
  const task: Task = await newTask.save()
  if (task == null) return null
  return task
}

export const updateTaskService = async (
  title: string,
  id: string
): Promise<UpdateTasksReturnType> => {
  const task: Task | null = await TaskModel.findByIdAndUpdate(
    id,
    { title },
    {
      new: true,
    }
  )

  if (task == null) return null
  return task
}

export const setTaskAsCompletedService = async (
  id: string
): Promise<SetTasksAsCompletedReturnType> => {
  const task: Task | null = await TaskModel.findByIdAndUpdate(
    id,
    { status: false },
    {
      new: true,
    }
  )

  if (task == null) return null
  return task
}

export const deleteTaskService = async (
  id: string
): Promise<DeleteTasksReturnType> => {
  const task: Task | null = await TaskModel.findByIdAndRemove(id, {
    new: true,
  })

  if (task == null) return null
  return task
}
