/** Libraries */
import type mongoose from 'mongoose'

export interface Task {
  _id: mongoose.Types.ObjectId
  title: string
  status: boolean
  createdAt: Date
}

/** Types services return */
export type GetTasksReturnType = Task[] | null

export type CreateTasksReturnType = Task | null

export type UpdateTasksReturnType = CreateTasksReturnType

export type SetTasksAsCompletedReturnType = CreateTasksReturnType

export type DeleteTasksReturnType = CreateTasksReturnType
