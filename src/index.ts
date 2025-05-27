import Fastify from 'fastify'

const app = Fastify()
const port = 3000

app.get('/health', async () => {
  return { status: 'OK' }
})

app.listen({ port: port }, err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`🚀 Server listening on http://localhost:${port}`)
})
