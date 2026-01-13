import jsonServer from 'json-server'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const PORT = 3001

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Custom routes
server.get('/events', (req, res) => {
  const db = router.db
  const events = db.get('events').value()
  res.json(events)
})

server.get('/events/:id', (req, res) => {
  const db = router.db
  const event = db.get('events').find({ id: parseInt(req.params.id) }).value()
  if (event) {
    res.json(event)
  } else {
    res.status(404).json({ error: 'Event not found' })
  }
})

server.get('/seat-plans/:eventId/:categoryId', (req, res) => {
  const db = router.db
  const key = `${req.params.eventId}-${req.params.categoryId}`
  const seatPlan = db.get('seat-plans').get(key).value()
  
  if (seatPlan) {
    res.json(seatPlan)
  } else {
    // Return default seats if not found
    const defaultSeats = [
      {"id": 1, "row": "A", "number": 1, "isBooked": false},
      {"id": 2, "row": "A", "number": 2, "isBooked": false},
      {"id": 3, "row": "A", "number": 3, "isBooked": false},
      {"id": 4, "row": "A", "number": 4, "isBooked": false},
      {"id": 5, "row": "B", "number": 1, "isBooked": false},
      {"id": 6, "row": "B", "number": 2, "isBooked": false},
      {"id": 7, "row": "B", "number": 3, "isBooked": false},
      {"id": 8, "row": "B", "number": 4, "isBooked": false},
      {"id": 9, "row": "C", "number": 1, "isBooked": false},
      {"id": 10, "row": "C", "number": 2, "isBooked": false},
      {"id": 11, "row": "C", "number": 3, "isBooked": false},
      {"id": 12, "row": "C", "number": 4, "isBooked": false}
    ]
    res.json(defaultSeats)
  }
})

server.post('/payment', (req, res) => {
  const payment = req.body
  
  // Validate payment data
  if (!payment.eventId || !payment.eventCategoryId || !payment.seats || 
      !payment.customer_name || !payment.customer_surname || !payment.customer_email ||
      !payment.cc_number || !payment.cc_exp_month || !payment.cc_exp_year) {
    return res.status(400).json({
      error: 'Invalid payment data',
      message: 'All fields are required'
    })
  }
  
  // Simulate successful payment
  res.status(200).json({
    success: true,
    message: 'Payment successful',
    ticketId: Math.floor(Math.random() * 100000),
    eventId: payment.eventId,
    seats: payment.seats,
    total: payment.seats.length * 100 // Mock calculation
  })
})

server.use(router)

server.listen(PORT, () => {
  console.log(`🚀 Mock API Server is running on http://localhost:${PORT}`)
  console.log(`📋 Available endpoints:`)
  console.log(`   GET  http://localhost:${PORT}/events`)
  console.log(`   GET  http://localhost:${PORT}/events/:id`)
  console.log(`   GET  http://localhost:${PORT}/seat-plans/:eventId/:categoryId`)
  console.log(`   POST http://localhost:${PORT}/payment`)
})

