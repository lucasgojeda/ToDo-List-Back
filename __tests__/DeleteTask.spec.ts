/** Libraries */
import request from 'supertest'

import { type Task } from '../src/interfaces/task.interface'

/** Application */
import server from '../src/Server'

describe('Delete /task - endpoint', () => {
  let app: any

  let task: Task

  const taskModel = {
    _id: expect.any(String),
    title: expect.any(String),
    status: expect.any(Boolean),
    createdAt: expect.any(String),
  }

  beforeAll(async () => {
    app = await new server()
  })

  afterAll(async () => {
    /** Disconnecting the server */
    await app.disconnect()
  })

  it('should delete a task.', async () => {
    /** Creating the task */
    const data = await request(app.app)
      .post('/api/task')
      .send({ title: 'Task - test' })
    task = data.body.task

    /** Deleting the task */
    const dataUpdated = await request(app.app).delete(`/api/task/${task._id}`)
    const taskDeleted: Task = dataUpdated.body.task

    /** Asserting the test */
    expect(dataUpdated.status).toBe(200)
    expect(taskDeleted).toEqual(taskModel)
  })
})
