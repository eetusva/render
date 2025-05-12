const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('data', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :response-time ms :data'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const amount = persons.length
  const time = new Date()
  res.send(`
    <p>Phonebook has info for ${amount} people</p>
    <p>${time}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).send({ error: 'person not found' })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const index = persons.findIndex(p => p.id === id)

  if (index !== -1) {
    persons.splice(index, 1)
    res.status(204).end()
  } else {
    res.status(404).send({ error: 'person not found' })
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const nameExists = persons.some(person => person.name === body.name)
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: Date.now().toString(),
    name: body.name,
    number: body.number
  }

  persons.push(newPerson)
  res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
