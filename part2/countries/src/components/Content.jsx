import Countries from "./Countries"
import Notification from "./notification"
import Country from './Country'


const Content = ({ countrySearch, setSelectedCountry, selectedCountry }) => {
    if (selectedCountry) {
        return <Country country={selectedCountry} />
    }
    else if (countrySearch.length > 10) {
        return <Notification message = {"Too many matches, specify another filter"} />
    }
    else if (countrySearch.length < 10 && countrySearch.length > 1) {
        return <Countries countrySearch = {countrySearch} setSelectedCountry={setSelectedCountry} />
    }
    else if (countrySearch.length === 1) {
        return <Country country = {countrySearch[0]}/>
    }
}

export default Content