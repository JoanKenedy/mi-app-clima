import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState({});
  const [degrees, setDegrees] = useState(0);
  const [isCon, setIsCon] = useState(true);


  const success = (pos) =>{
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=729097db9f336034a5c1656337dca3b3`)
    .then(res =>{
    setWeather(res.data);
      setDegrees(res.data.main.temp)
    })
   
  }

  useEffect( () => {
    navigator.geolocation.getCurrentPosition(success)
 
  },[])
  
  const conversionDegrees = () => {
     if(isCon){
    setDegrees((degrees * 9 / 5 )+ 32);
    setIsCon(false); 
    }else{

    setDegrees((degrees - 32) * 5 / 9); 
    setIsCon(true) 
    }
  }





  return (
    <div className="App">
      <div className='card'>
        <div className="header">
          <h1>Weather App</h1>
        <p>{weather.sys?.country} {weather.name}</p>
          </div>
     <div className='body_card'>
     <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
     <h2>Temparature: {degrees} {isCon ? '°C' : '°F'}</h2>
      
     </div>
     <div className='temperature'>
    
      <h2>{`Humidity: ${weather.main?.humidity} % `}</h2>
      <h2>  {`Pressure: ${weather.main?.pressure} atm `} </h2>
     </div>
     
        
       
     
       <button onClick={conversionDegrees}>
         Convertir de Celsius / Fahrenheit
       </button >

      </div>
    </div>
  );
}

export default App;
