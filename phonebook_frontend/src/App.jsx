import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => setPersons(response))
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const nameObj = { name: newName, number: newNumber }

    // check for duplicate name
    let duplicate = persons.filter(person => person.name === newName)
    if (duplicate.length > 0) {
      if(confirm(`${newName} is already added to phonebook, replace the
        old number with a new one?`)) {
        personService.updateNumber(duplicate[0], newNumber)
          .then(() => {
            personService.getAll().then(response => setPersons(response))
            setNewName('')
            setNewNumber('')
            setNotification({
              type: 'success',
              text: `Updated ${nameObj.name}`
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(() => {
            setNotification({
              type: 'error',
              text: `${nameObj.name} has already been deleted`
            })
            personService.getAll().then(response => setPersons(response))
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
      return
    }

    personService.create(nameObj).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotification(`Added ${nameObj.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
  }

  const filterNames = (event) => {
    setFilterString(event.target.value)
  }

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person)
      personService.getAll().then(response => setPersons(response))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filterString={filterString} filterNames={filterNames} />
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}
        handleFormSubmit={handleFormSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterString={filterString}
        deleteFunc={deletePerson} />
    </div>
  )
}

export default App
