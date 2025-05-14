const Filter = ({ countryFilter, handleFilterChange }) => <div>Search:<input name = 'search' value = {countryFilter} onChange={handleFilterChange} /></div>

export default Filter