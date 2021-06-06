const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

// to use and allow for requests from all origins
app.use(cors())

// setup request body for JSON parsing
app.use(express.json())

// setup morgan for http request logging
app.use(morgan('dev'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]

// get all persons
app.get('/api/persons', (req, res) => {
    return res.json(persons)
})

//Display a page
app.get('/info', (req, res) => {
    const text = `<div><p>Phonebook info has ${persons.length} people</p>
                 <p>${new Date}</p></div>`
    res.send(text)
})

//get person by id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    
    person ? res.json(person) : res.status(404).end()
})

//delete by id
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    
   res.status(204).end()
})

//add person to the phonebook
app.post('/api/persons', (req, res) => {
    let person = req.body

    if (person.name === '' || person.number === '') {
        res.json({error: 'content is missing'}).status(400)
    } else {
        let checkExisting = persons.filter(
            existingPerson => existingPerson.name.toLowerCase().includes(person.name.toLowerCase()))
        
        if (checkExisting.length) {
            res.json({error: 'name must be unique'}).status(400).end()
        } else {
            person.id = Math.floor(Math.random() * 10000)
            persons = persons.concat(person)
            res.json(person)
        }
    } 
})

//Setting a port for the application
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
