const Persons = ({ filteredList }) => <ul>{filteredList.map(person => <li key = {person.id}> {person.name} {person.number}</li>)}</ul>

export default Persons