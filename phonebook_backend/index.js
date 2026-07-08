const express = require('express')
const morgan = require('morgan')

morgan.token('data', (request) => {
  return JSON.stringify(request.body)
})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :total-time[2] :data'))
app.use(express.static('dist'))

const PORT = process.env.PORT || 3001

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
  const dateNow = new Date().toString()
  const phoneBookSize = persons.length

  response.send(`<p>Phonebook has info for ${phoneBookSize} people</p>
                 <p>${dateNow}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const postData = request.body

  // verify required fields are provided
  if (!postData.name) {
    return response.status(400).json({
      error: "You must provide a name"
    })
  } else if (!postData.number) {
    return response.status(400).json({
      error: "You must provide a number"
    })
  }

  // verify no duplicate names
  const matches = persons.filter(person => person.name === postData.name)
  if (matches.length > 0) {
    return response.status(400).json({
      error: "Name already in phonebook",
    })
  }

  const newPerson = {
    name: postData.name,
    number: postData.number
  }

  newPerson.id = String(Math.floor((Math.random() * 10000)))

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(person => person.id === request.params.id)

  person ? response.send(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter(person => person.id !== request.params.id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})

