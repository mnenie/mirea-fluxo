import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import { OrderController, UserController } from './controllers/index.js'
import { checkAuth, handleValidationErrors } from './utils/index.js'

mongoose.set('strictQuery', false)
dotenv.config()
const MONGO_DB = process.env.MONGO_DB

mongoose
  .connect(MONGO_DB)
  .then(() => console.log('DB ok'))
  .catch(err => console.log('DB error', err))

const app = express()
app.use(express.json())
const allowedOrigins = ['http://localhost:5173', 'https://iptip-hack-2024-client.vercel.app']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin)
    }
    else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))

app.listen(1234, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK ')
})

app.get('/', (req, res) => {
  res.send('Гугуца батрачит')
})

app.post('/auth/login', handleValidationErrors, UserController.login)
app.post('/auth/register', handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/orders', checkAuth, OrderController.getAll)
app.get('/orders/:id', checkAuth, OrderController.getById)
app.post('/orders', checkAuth, handleValidationErrors, OrderController.create)
app.patch('/orders/:id', checkAuth, handleValidationErrors, OrderController.update)

app.delete('/stages/:id', checkAuth, OrderController.remove)

app.put('/stages/:id', checkAuth, handleValidationErrors, OrderController.createstage)

app.post('/risks/:id', checkAuth, OrderController.podborka)

app.get('/sse', OrderController.sse)
