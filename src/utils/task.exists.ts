/** Models */
import TaskModel from '../models/task.model'

export const taskExists = async (id: string): Promise<void> => {
  const taskExists = await TaskModel.findById(id)

  if (!taskExists) {
    throw new Error(`The task with id: '${id}' does not exist.`)
  }
}
