import axios from 'axios'

const baseUrl = '/api/persons'

// get all the names from the phonebook
const getAll = () => axios.get(baseUrl).then(response => response.data)

// create new person
const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

const updateNumber = (person, newNumber) => {
  return axios.patch(`${baseUrl}/${person.id}`, `{ "number": "${newNumber}"}`)
}

const deletePerson = person => {
  return axios.delete(`${baseUrl}/${person.id}`)
}

export default { getAll, create, updateNumber, deletePerson }

