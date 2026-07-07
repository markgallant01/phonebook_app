import Person from './Person.jsx'

const Persons = ({ persons, filterString, deleteFunc }) => {
  return (
    <div>
      {persons
        .filter(person => person.name.includes(filterString))
        .map(person => {
          return <Person key={person.name} person={person}
            deleteFunc={() => deleteFunc(person)} 
          />
        })
      }
    </div>
  )
}

export default Persons

