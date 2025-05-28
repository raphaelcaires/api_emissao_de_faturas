import Fastify from 'fastify'
import { chargesRoutes } from './routes/charges.route'
import { healthRoute } from './routes/health.route'

const app = Fastify({
  logger: true,
})

app.register(healthRoute)
app.register(chargesRoutes)

export default app