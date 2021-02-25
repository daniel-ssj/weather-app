import React, { useState, useEffect } from 'react'

import '../weather.css'
import { config } from '../config'

const Weather = () => {
  const [location, setLocation] = useState('')
  const [temperature, setTemperature] = useState('')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const [isDone, setIsDone] = useState(false)

  const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${config.key}&q=`
    .concat(location)
    .concat('&units=metric')

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsDone(true)
  }

  useEffect(() => {
    if (isDone) {
      fetch(URL)
        .then((res) => {
          res.json().then((data) => {
            const {
              weather: [{ icon }],
              main: { temp },
              sys: { country },
              name,
            } = data
            setTemperature(Math.floor(temp).toString().concat(' °C'))
            setName(name)
            setCountry(country)
            setIconUrl(`https://openweathermap.org/img/w/${icon}.png`)
          })
        })
        .catch((err) => console.err(err))
    }
  })

  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor='location'
          style={{
            marginRight: '1rem',
            fontSize: '1.5rem',
          }}
        >
          Enter a place name
        </label>
        <input
          type='text'
          name='location'
          id='location'
          autoComplete='off'
          onChange={(e) => {
            setLocation(e.target.value)
            setIsDone(false)
          }}
        />
        <input type='submit' value='Enter' style={{ padding: '1rem' }} />
      </form>
      <div class='weather'>
        {name && <h1>{name + ', ' + country}</h1>}
        <img src={iconUrl} alt='' style={{ maxWidth: '200px' }} />
        <h1>{temperature}</h1>
      </div>
    </div>
  )
}

export default Weather
