import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ findName, setFindName ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')
    
    let copyNewName = newName
    let copyPersons = persons
    let copyNewNumber = newNumber
    let copyFindName = findName

    // useEffect to get all the persons
    useEffect(() => {
        personService.getAll()
            .then(response => {
            setPersons(response)
        })
    }, [])

    /**
     * handleSubmit validates data when submission is done
     * @param {event} e 
     */
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
                    setErrorMessage(`Added ${copyNewName}`)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setErrorMessage(`${error.response.data.error}`)
                })
            setTimeout(() => { setErrorMessage(null) }, 5000);
        } else {
            const personId = checkData[0].id
            const updateAction = window.confirm(`${copyNewName} is already in the phone book, replace the old number with a new one`)
            if (updateAction) {
                personService.create(newPerson)
                    .then(response => {
                        setPersons(copyPersons.map(thisPerson => thisPerson.id !== personId ? thisPerson : response))
                    })
                    .catch(error => {
                        console.log(error);
                        setErrorMessage(`Information of ${copyNewName} has already been removed from the server`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000);
                        setPersons(copyPersons.filter(person => person.id !== personId))
                    })
                setNewName('')
                setNewNumber('')
            }
        }
    }

    /**
     * Handle Delete removes a person's data
     * @param {event} e 
     */
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
    
    /**
     * handleNameChange sets the value of the input field to the name
     * @param {event} e 
     */
    const handleNameChange = e => {
        setNewName(e.target.value)
    }

    /**
     * handleNumberChange sets the value of the number field to the name
     * @param {event} e 
     */
    const handleNumberChange = e => {
        setNewNumber(e.target.value)
    }

    /**
     * Search handles the filtering of names to be displayed
     * @param {event} e 
     */
    const handleFindNameChange = e => {
        setFindName(e.target.value)
        let displayedName = persons.filter(person => person.name.toLowerCase().includes(copyFindName.toLowerCase()))
        setPersons(displayedName)
    }

    return (
        <div>
            <Filter
                copyFindName={copyFindName}
                handleFindNameChange={handleFindNameChange}
            />

            <h2>Phone book</h2>
            <Notification message={errorMessage} />
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