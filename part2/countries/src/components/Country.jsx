import Weather from './Weather'

const Country = ({ country }) => {
    return (    
        <>  
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital[0]}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <p>{(Object.values(country.languages).map((language,index) => <li key = {index}>{language}</li>))}</p>
        <p><img src = {country.flags.png} alt = {country.flags.src}></img></p>
        <h2>Weather in {country.capital[0]}</h2>
        <Weather lat = {country.latlng[0]} lon = {country.latlng[1]} />
        </>
    )
}

export default Country