import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName) || persons.some(person => person.number === newNumber) ) {
      window.alert(`${newName} or ${newNumber} is already in the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredList = filteredName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilteredName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Search:<input value = {filteredName} onChange={handleFilterChange}></input></div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>{persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}</ul>
      <h2>Filtered numbers</h2>
      <ul>{filteredList.map(person => <li key={person.id}>{person.name} {person.number}</li>)}</ul>
      <div>debug: {newName}</div>
      ...
    </div>
  )
}

export default App