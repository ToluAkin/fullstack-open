import React, { useState, useEffect } from 'react'
import axios from '../../../../6-state-management-redux/redux-anecdotes/node_modules/axios'

const Weather = ({ country }) => {
    const [ weather, setWeather ] = useState('')
    const [ loading, setLoading ] = useState(true)

    const apiKey = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country}`)
            .then(response => {
                setWeather(response.data.current)
                if (response) {
                    setLoading(false)
                }
                return weather
            })
            .catch(error => {
                console.log('Error parsing data: ' + error);
            })
    }, [])
    
    let weatherCondition
    if (loading) {
        weatherCondition = <p>Loading ......</p>
    } else {
        weatherCondition = <div>
            <p><b>Temperature</b>: { weather.temperature } degree celsius</p>
            <img src={ weather.weather_icons[0] } alt={ weather.weather_descriptions[0] } />
            <p><b>wind</b>: { weather.wind_speed }mph direction { weather.wind_dir } </p>
        </div>
    }
    return (
        <section>
            <h3>Weather in {country}</h3>
            { weatherCondition }
        </section>
    )
}

export default Weather