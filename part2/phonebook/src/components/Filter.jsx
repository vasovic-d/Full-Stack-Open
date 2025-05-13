const Filter = ({ filteredName, handleFilterChange }) => <div>Search:<input name = 'search' value = {filteredName} onChange={handleFilterChange} /></div>

export default Filter