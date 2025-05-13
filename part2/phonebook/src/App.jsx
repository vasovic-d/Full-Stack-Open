import { useState,useEffect } from 'react'
import personService from './services/phonebook.js'
import Filter from './components/Filter'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [notification, setNotification] = useState(null)

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
            setNotification(`Number of ${returnedPerson.name} was changed successfully`)
            setTimeout(() => {setNotification(null)}, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`${returnedPerson.name} was added successfully`)
          setTimeout(() => {setNotification(null)}, 5000)
        })
     }
  }

  const deleteName = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
        })
        .catch(error => {
          alert(`the note ${note.content} was already deleted from server`)
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
      <Notification message = {notification} />
      <Filter filteredName = {filteredName} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredList={filteredList} remove={deleteName} />
    </div>
  )
}

export default App