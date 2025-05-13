const Persons = ({ filteredList, remove }) => (
<ul>
    {filteredList.map(person =>
        <li key = {person.id}> {person.name} {person.number} <button onClick={() => remove(person.id)}>delete</button></li>)}
</ul>
)
export default Persons