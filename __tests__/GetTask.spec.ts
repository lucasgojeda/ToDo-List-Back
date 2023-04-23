/** Libraries */
import request from 'supertest'

import { type Task } from '../src/interfaces/task.interface'

/** Application */
import server from '../src/Server'

describe('Get /task - endpoint', () => {
  let app: any

  const task = {
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

  it('should return the all tasks.', async () => {
    const data = await request(app.app).get('/api/task/all/asc/0/10').send()
    const tasks: Task[] = data.body.tasks

    /** Asserting the test */
    expect(data.status).toBe(200)
    expect(tasks.length).toBe(7)
    expect(tasks[0]).toEqual(task)
  })

  it('should return the completed tasks.', async () => {
    const data = await request(app.app)
      .get('/api/task/completed/asc/0/10')
      .send()
    const tasks: Task[] = data.body.tasks

    /** Asserting the test */
    expect(data.status).toBe(200)
    expect(tasks.length).toBe(2)
    expect(tasks[0]).toEqual(task)
  })

  it('should return the uncompleted tasks.', async () => {
    const data = await request(app.app)
      .get('/api/task/uncompleted/asc/0/10')
      .send()
    const tasks: Task[] = data.body.tasks

    /** Asserting the test */
    expect(data.status).toBe(200)
    expect(tasks.length).toBe(5)
    expect(tasks[0]).toEqual(task)
  })
})
