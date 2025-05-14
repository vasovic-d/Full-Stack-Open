import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Content from './components/Content'


const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
      console.log('fetching countries')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(countries => {
          setAllCountries(countries.data)
        })
    }, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(null)
  }


  
  const trimmedFilter = countryFilter.trim()
  const countrySearch = trimmedFilter.length === 0 ? [] : allCountries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  return (
    <>
      <Filter countryFilter={countryFilter} handleFilterChange={handleFilterChange} />
      <Content countrySearch = {countrySearch} selectedCountry = {selectedCountry} setSelectedCountry={setSelectedCountry}/>
    </>
  )
}

export default App
