/** Libraries */
import { type Application, type Request, type Response } from 'express'

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

/** Utils */
import { log } from './logger'

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ToDo List',
      version: '1.0.0',
      description: 'ToDo List application',
      contact: {
        name: 'Lucas Gabriel Ojeda',
        url: 'https://lucasgabrielojeda.netlify.app/',
        email: 'ojedalucasgabriel2@gmail.com',
      },
    },
    servers: [
      {
        url: 'https://todo-list-back-7wn2.onrender.com/api',
      },
      {
        url: 'http://localhost:8080/api',
      },
    ],
  },
  apis: ['./src/routes/task.routes.ts'],
}

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options)

// Function to setup our docs
export const swaggerDocs = (app: Application): void => {
  // Route-Handler to visit our docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Make our docs in JSON format available
  app.get('/api/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  log.info('Swagger docs are available on /api/docs')
}
