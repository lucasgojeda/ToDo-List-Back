/** Libraries */
import express, { type Express } from 'express'
import 'dotenv/config'
import cors from 'cors'
import chalk from 'chalk'
import logger from 'morgan'
import http, { type Server as TServer } from 'http'

/** Database */
import { dbConnect, dbDisconnect } from './config'

/** Routes */
import { taskRouter } from './routes'

/** Utils */
import { log, swaggerDocs } from './utils'

export default class Server {
  private readonly app: Express
  private readonly HttpServer: TServer
  private readonly port: string
  private readonly apiPaths = {
    task: '/api/task',
  }

  constructor() {
    this.port = process.env.PORT ?? '8080'
    this.app = express()
    this.HttpServer = http.createServer(this.app)

    /** Initial methods */
    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  async dbConnection() {
    await dbConnect()
  }

  middlewares() {
    this.app.use(cors())

    if (process.env.ENV_MODE !== 'TEST') {
      this.app.use(logger('dev'))
    }

    this.app.use(express.json())

    this.app.use(express.static('public'))

    /** Swagger docs */
    swaggerDocs(this.app)
  }

  routes() {
    this.app.use(this.apiPaths.task, taskRouter)
  }

  listen() {
    this.HttpServer.listen(this.port, () => {
      log.info(
        `${chalk.white('Server listening on port')} ${chalk.cyan(this.port)}`
      )
    })
  }

  async disconnect() {
    this.HttpServer.close()
    await dbDisconnect()
  }
}
