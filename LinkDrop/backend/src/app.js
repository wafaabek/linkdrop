import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDB } from './db/index.js'
import authRoutes from './routes/auth.routes.js'
import linksRoutes from './routes/links.routes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/links', linksRoutes)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))
const PORT = process.env.PORT || 5000
initDB().then(() => app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`)))