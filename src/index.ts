import Fastify from 'fastify'
import { chargesRoutes } from './routes/charges.routes'

const server = Fastify()
const port = 3000

server.register(chargesRoutes)

server.get('/', async () => { return { status: 'OK' } })

server.listen({ port: port }, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`🚀 Servidor em execução em http://localhost:${port}`)
})
