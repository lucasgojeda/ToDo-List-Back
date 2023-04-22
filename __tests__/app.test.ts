/** Libraries */
import request from 'supertest'

/** Application */
import server from '../src/Server'

describe('Auth', () => {
  let app: any

  beforeAll(async () => {
    app = await new server()
  })

  afterAll(async () => {
    await app.disconnect()
  })
  it('should return the tasks.', async () => {
    const resp = await request(app.app).get('/api/task/all/asc/0/10').send()
    console.log(resp.body.tasks[0])
    const task = {
      _id: typeof String,
      title: typeof String,
      status: typeof Boolean,
      createdAt: typeof String,
    }
    expect(resp.status).toBe(200)
    expect(resp.body.tasks[0]).toEqual(task)
  })
})
