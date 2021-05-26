import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    axios.get('http://localhost:3001/persons')
        .then(response => {
            setPersons(response.data)
        })
    }, [])

    
    const handleSubmit = (e) => {
        e.preventDefault()

        let checkData = copyPersons.filter(person => {
            // eslint-disable-next-line
            return person.name == copyNewName;
        })

        if (!checkData.length) {
            let newData = copyPersons.concat({ name: copyNewName, number: copyNewNumber })
            setPersons(newData)
            setNewName('')
            setNewNumber('')
        } else {
            alert(`${copyNewName} is already in the phone book`)
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
            <Person persons={copyPersons} />
        </div>
    )
}

export default App