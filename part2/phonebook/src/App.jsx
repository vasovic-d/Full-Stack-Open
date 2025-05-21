import { useState, useEffect } from 'react'
import personService from './services/phonebook.js'
import Filter from './components/Filter'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import Notification from './components/Notification.jsx'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
    }

    const existingPerson = persons.find(p => p.name === trimmedName)

    if (existingPerson) {
      if (window.confirm(`${trimmedName} is already in the phonebook, replace old number with new one?`)) {
        const changedPerson = {...existingPerson, number: trimmedNumber }

        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setNotification({message: `Number of ${returnedPerson.name} was changed successfully`, type: 'success'})
            setTimeout(() => {setNotification({message: null, type: null})}, 5000)
          })
          .catch(error => {
          setNotification({message: `Seems ${existingPerson.name} was already deleted from server`, type: 'error'})
          setTimeout(() => {setNotification({message: null, type: null})}, 5000)
          console.error(`Failed to delete ${existingPerson.name}:`, error)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({message: `${returnedPerson.name} was added successfully`, type: 'success'})
          setTimeout(() => {setNotification({message: null, type: null})}, 5000)
        })
     }
  }

  const deleteName = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setNotification({message: `Information of ${person.name} has already been deleted from server`, type: 'error'})
          setTimeout(() => {setNotification({message: null, type: null})}, 5000)
          console.error(`Failed to delete ${person.name}:`, error)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }
  

  const filteredList = filteredName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilteredName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification.message} type = {notification.type} />
      <Filter filteredName = {filteredName} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredList={filteredList} remove={deleteName} />
    </div>
  )
}

export default App