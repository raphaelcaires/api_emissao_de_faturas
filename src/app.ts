import Fastify from 'fastify'
import { chargesRoutes } from './routes/charges.route'
import { healthRoute } from './routes/health.route'
import { invoicesRoutes } from './routes/invoice.route'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'

const app = Fastify({
  logger: true,
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API Emissão de Faturas',
      description: 'Documentação da API de emissão de faturas',
      version: '1.0.0',
    },
  },
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
})

app.register(healthRoute)
app.register(chargesRoutes)
app.register(invoicesRoutes)

export default app
