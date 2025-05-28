import Fastify from 'fastify'
import { chargesRoutes } from './routes/charges.route'
import { healthRoute } from './routes/health.route'
import { invoicesRoutes } from './routes/invoice.route'

const app = Fastify({
  logger: true,
})

app.register(healthRoute)
app.register(chargesRoutes)
app.register(invoicesRoutes)

export default app