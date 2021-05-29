import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ findName, setFindName ] = useState('')
    
    let copyNewName = newName
    let copyPersons = persons
    let copyNewNumber = newNumber
    let copyFindName = findName

    useEffect(() => {
        personService.getAll()
            .then(response => {
            setPersons(response)
        })
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        let checkData = copyPersons.filter(person => {
            // eslint-disable-next-line
            return person.name == copyNewName;
        })
        let newPerson = { name: copyNewName, number: copyNewNumber }
        
        if (!checkData.length) {

            personService.create(newPerson)
                .then(response => {
                    setPersons(copyPersons.concat(response))
                    setNewName('')
                    setNewNumber('')
            })
            
        } else {
            const personId = checkData[0].id
            const updateAction = window.confirm(`${copyNewName} is already in the phone book, replace the old number with a new one`)
            if (updateAction) {
                personService.update(personId, newPerson)
                    .then(response => {
                        setPersons(copyPersons.map(thisPerson => thisPerson.id !== personId ? thisPerson : response))
                })
            }
        }
    }

    const handleDelete = e => {
        const id = e.target.getAttribute('data-id')
        // eslint-disable-next-line eqeqeq
        const toRemove = copyPersons.find(thisPerson => thisPerson.id == id)
        // eslint-disable-next-line eqeqeq
        const newPersons = copyPersons.filter(person => person.id != id)

        const deleteAction = window.confirm(`Delete ${toRemove.name} ?`)
        if (deleteAction) {
            personService.remove(id)
            .then(response => {
                setPersons(newPersons)
            })
        }
    }
    
    const handleNameChange = e => {
        setNewName(e.target.value)
    }

    const handleNumberChange = e => {
        setNewNumber(e.target.value)
    }

    const handleFindNameChange = e => {
        let root = document.querySelectorAll('li')
        setFindName(e.target.value)
        root.forEach(item => {
            let matched = item.innerHTML.toLowerCase().includes(copyFindName)
            if (matched) {
                item.style.display = ''
            } else {
                item.style.display = 'none'
            }
        })
    }

    return (
        <div>
            <Filter
                copyFindName={copyFindName}
                handleFindNameChange={handleFindNameChange}
            />

            <h2>Phone book</h2>
            <PersonForm
                copyNewName={copyNewName}
                copyNewNumber={copyNewNumber}
                handleSubmit={handleSubmit}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            
            <h2>Numbers</h2>
            <Person persons={copyPersons} handleDelete={handleDelete} />
        </div>
    )
}

export default App