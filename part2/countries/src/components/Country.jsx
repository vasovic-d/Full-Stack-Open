const Country = ({ country }) => {
    return (    
        <>  
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital[0]}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <p>{(Object.values(country.languages).map((language,index) => <li key = {index}>{language}</li>))}</p>
        <p><img src = {country.flags.png} alt = {country.flags.src}></img></p>
        </>
    )
}

export default Country