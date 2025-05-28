import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const { PORT } = process.env
const port = PORT ? Number(PORT) : 3000

app.listen({ port, host: '0.0.0.0' }, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`🚀 O servidor está online! Acesse em: http://localhost:${port}`)
})
