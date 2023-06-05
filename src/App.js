import React, { useState } from 'react';
import pic1 from './hot_weather.jpg'
import pic2 from './cold_weather.jpg'

import './App.css'

const API_KEY = {
  key: '5025682a09668f06c331b6ae4408a453'
}

const App = () => {
  const [citiesByWord, setCitiesByWord] = useState('')
  const [showingOnScreen, setShowingOnScreen] = useState({})

  const location = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citiesByWord}&appid=${API_KEY.key}`)
      .then(resp => resp.json())
      .then(resp => setShowingOnScreen(resp))
      .then(error => console.log(error))
  }
  const citiesFinderByText = (e) => {
    setCitiesByWord(e.target.value)
  }
  const searching = () => {
    location(citiesByWord)
  }
  return (
    <div className='fullApp'>
      <div className='heading'>
        <h3>Weather App</h3>
      </div>

      <div className='inputField'>
        <input type='text' required value={citiesByWord} onChange={citiesFinderByText} className='input' />
        <button onClick={searching} className='buttonSearch'>Click here to Search</button>
      </div>

      <div className='showing'>
        <div className='showingDes'>
          {showingOnScreen?.name ? <h3>{showingOnScreen?.name}</h3> : <h3>City Name</h3>}
        </div>
        <div className='showingDes'>
          {showingOnScreen?.main?.temp ? <h3>{((showingOnScreen?.main?.temp) - 273.15).toFixed(2)}'C</h3> : <h3> 0'C </h3>}
        </div>
        <div className='showingDes'>
          {showingOnScreen?.sys?.country ? <h3>{(showingOnScreen?.sys?.country)}</h3> : <h3> Country </h3>}
        </div>
      </div>
      <div >
        {showingOnScreen?.main?.temp && ((showingOnScreen?.main?.temp) - 273.15) < 20 ? <img src={pic1} alt="cold Weather" width='100' height='100' /> : null}
        {showingOnScreen?.main?.temp && ((showingOnScreen?.main?.temp) - 273.15) >= 20 ? <img src={pic2} alt="Hot Weather" width='100' height='100' /> : null}
      </div>
    </div>
  );
}

export default App;
