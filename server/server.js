import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import {v4 as uuidv4} from 'uuid'

// Ustawienie klucza tajnego i zmiennej środowiskowej dla json-server-auth
const SECRET_KEY =
  '4f1b18eae3dc6e9d8b622bfa2d1e7382b4513c9eb2a3784917a9eb33d7a7ebea'
/* global process */

process.env.JWT_SECRET = SECRET_KEY

import auth from 'json-server-auth' // Importujemy po ustawieniu JWT_SECRET

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = express()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.db = router.db
server.use(middlewares)
server.use(express.json())
server.use(cors())

// Niestandardowe endpointy umieszczone przed middleware auth

// 🟢 Rejestracja użytkownika
server.post('/register', async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    acceptTermsCheckbox,
  } = req.body

  if (
    !email ||
    !password ||
    !confirmPassword ||
    !firstName ||
    !lastName ||
    acceptTermsCheckbox === undefined
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const users = router.db.get('users').value()
  const existingUser = users.find((u) => u.email === email)

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' })
  }

  // Hashowanie hasła
  const hashedPassword = await bcrypt.hash(password, 10)

  // Tworzenie nowego użytkownika
  const newUser = {
    id: users.length + 1, // Generowanie ID
    email,
    password: hashedPassword,
    confirmPassword, // Dla nauki – pozostawiamy oryginalne hasło
    firstName,
    lastName,
    acceptTermsCheckbox,
  }

  // Zapis do db.json
  router.db.get('users').push(newUser).write()

  // Generowanie tokena JWT
  const accessToken = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    SECRET_KEY
  )

  res.status(201).json({
    success: true,
    accessToken,
    user: newUser,
    message: 'User registered successfully',
  })
})

// 🟢 Logowanie użytkownika
server.post('/login', async (req, res) => {
  const { email, password } = req.body
  const users = router.db.get('users').value()

  const user = users.find((u) => u.email === email)

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  // Porównanie hasła
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  // Generowanie tokena JWT
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    SECRET_KEY
  )

  res.json({
    success: true,
    accessToken,
    user,
    message: 'Login successful',
  })
})

// 🟢 Składanie zamówienia (z autoryzacją JWT)
server.post('/orders', (req, res) => {
  console.log('🔹 Endpoint /orders został wywołany!')

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('🔴 Brak nagłówka Authorization')
    return res.status(401).json({ message: 'Authorization token required' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    console.log('✅ Token JWT poprawnie zweryfikowany:', decoded)

    const userId = decoded.userId
    console.log('👤 Użytkownik ID:', userId)

    const { items, totalPrice, shippingAddress, paymentMethod } = req.body
    if (
      !items ||
      items.length === 0 ||
      !totalPrice ||
      !shippingAddress ||
      !paymentMethod
    ) {
      console.log('🔴 Niepełne dane zamówienia!')
      return res.status(400).json({ message: 'All order fields are required' })
    }

    const newOrder = {
      id: uuidv4(),
      userId,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    console.log('✅ Zamówienie utworzone:', newOrder)
    router.db.get('orders').push(newOrder).write()

    res.status(201).json({
      success: true,
      order: newOrder,
      message: 'Order placed successfully',
    })
  } catch (error) {
    console.log('🔴 Błąd weryfikacji tokena:', error.message)
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
})

// 🟢 Pobieranie zamówień użytkownika (z autoryzacją JWT)
server.get('/orders', (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    const userId = decoded.userId

    const userOrders = router.db.get('orders').filter({ userId }).value()

    res.json({ success: true, orders: userOrders })
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
})

// 🟢 Usuwanie zamówienia (z autoryzacją JWT)
server.delete('/orders/:id', (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    const userId = decoded.userId

    const orderId = parseInt(req.params.id, 10)

    // Wyszukanie zamówienia, które należy do zalogowanego użytkownika
    const order = router.db.get('orders').find({ id: orderId, userId }).value()

    if (!order) {
      return res
        .status(404)
        .json({ message: 'Order not found or access denied' })
    }

    // Usunięcie zamówienia z bazy
    router.db.get('orders').remove({ id: orderId, userId }).write()

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    })
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
})

// Po endpointach niestandardowych dodajemy middleware json-server-auth
server.use(auth)
server.use(router)

server.listen(4001, () => {
  console.log('✅ JSON Server is running on port 4001')
})
