import Fastify from 'fastify'
import { chargesRoutes } from './routes/charges.routes'

const app = Fastify({
  logger: true,
})

app.register(chargesRoutes)

app.get('/', async () => {
  return { status: 'OK' }
})

export default app
