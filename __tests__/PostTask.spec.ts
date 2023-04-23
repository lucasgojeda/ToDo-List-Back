/** Libraries */
import request from 'supertest'

import { type Task } from '../src/interfaces/task.interface'

/** Application */
import server from '../src/Server'

describe('Post /task - endpoint', () => {
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

  it('should create a task.', async () => {
    /** Creating the task */
    const data = await request(app.app)
      .post('/api/task')
      .send({ title: 'Task - test' })
    task = data.body.task

    /** Asserting the test */
    expect(data.status).toBe(200)
    expect(task).toEqual(taskModel)
  })
})
