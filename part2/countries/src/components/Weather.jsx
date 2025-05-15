import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({lat, lon}) => {
    const [weather, setWeather] = useState(null)

    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect (() => {
        console.log('effect run, weather now for')
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [lat,lon])

    if (!weather) {
        return <p>weather is loading</p>
    }
    
    return (     
        <>
        <div>Temperature {weather.main.temp}</div>
        <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <div>Wind {weather.wind.speed}</div>
        </>
    )
}

export default Weather