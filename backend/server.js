import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import usersRoutes from './user/userRoutes.js'
import profileRoutes from './profile/profileRoutes.js'
import postRoutes from './posts/postRoutes.js'
import uploadAvatarRoutes from './uploads/uploadAvatarRoutes.js'
import uploadCoverRoutes from './uploads/uploadCoverRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandling.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/upload/avatar', uploadAvatarRoutes)
app.use('/api/upload/cover', uploadCoverRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => `The servers is running on port ${PORT}`)
