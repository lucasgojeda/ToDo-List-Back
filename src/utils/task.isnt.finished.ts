/** Models */
import TaskModel from '../models/task.model'

export const taskIsntFinished = async (id: string): Promise<void> => {
  const task = await TaskModel.findById(id)

  if (!task) {
    throw new Error(`The task with id: '${id}' does not exist.`)
  }

  if (!task.status) {
    throw new Error(`The task with id: '${id}' is already marked as finished.`)
  }
}
