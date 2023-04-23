/** Libraries */
import request from 'supertest'

import { type Task } from '../src/interfaces/task.interface'

/** Application */
import server from '../src/Server'

describe('Patch /task - endpoint', () => {
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
    /** Deleting the task */
    await request(app.app).delete(`/api/task/${task._id}`)

    /** Disconnecting the server */
    await app.disconnect()
  })

  it('should set a task as completed.', async () => {
    /** Creating the task */
    const data = await request(app.app)
      .post('/api/task')
      .send({ title: 'Task - test' })
    task = data.body.task

    /** Updating the task */
    const dataUpdated = await request(app.app).patch(`/api/task/${task._id}`)
    const taskCompleted: Task = dataUpdated.body.task

    /** Asserting the test */
    expect(dataUpdated.status).toBe(200)
    expect(taskCompleted).toEqual(taskModel)
    expect(taskCompleted.status).toBe(false)
  })
})
