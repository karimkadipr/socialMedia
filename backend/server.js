import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import usersRoutes from './user/userRoutes.js'
import profileRoutes from './profile/profileRoutes.js'
import postRoutes from './posts/postRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandling.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('AYAYA')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => `The servers is running on port ${PORT}`)
