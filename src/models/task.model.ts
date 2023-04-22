/** Libraries */
import { model, Schema, type Document } from 'mongoose'

/** Interfaces */
import { type Task } from '../interfaces/task.interface'

type TaskDocument = Task & Document

const TaskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
})

TaskSchema.methods.toJSON = function () {
  const { __v, ...task } = this.toObject()
  return task
}

const TaskModel = model('task', TaskSchema)

export default TaskModel
