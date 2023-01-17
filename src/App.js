import { useEffect, useState } from 'react';
import './App.scss';
import morningImage from './images/mimage.jpg';
import afternoonImage from './images/aImage.jpg';
import nightImage from './images/nImage.jpg';
import axios from 'axios';

const App = () => {
  const date = new Date();

  const [seconds, setSeconds] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [city, setCity] = useState('Noida');
  const [temp, setTemp] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(date.getSeconds());
    }, 1000);

    const interval1 = setInterval(() => {
      setMinutes(date.getMinutes());
    }, 60000);

    const interval2 = setInterval(() => {
      setHours(date.getHours());
    }, 600000);

    return () => {
      clearInterval(interval);
      clearInterval(interval1);
      clearInterval(interval2);
    };
  });

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4b65ecd584ffb6a0f630295d413f261
    `
      )
      .then((res) => {
        setTemp(Math.round(res.data.main.temp - 273));
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, [city]);

  return (
    <>
      <div
        className='body'
        style={{
          backgroundImage: `url(${
            date.getHours() > 6 && date.getHours() < 12
              ? morningImage
              : date.getHours() > 12 && date.getHours() < 17
              ? afternoonImage
              : nightImage
          })`,
        }}
      >
        <div className='upper-element'>
          <p className='greeting'>
            Good{' '}
            {date.getHours() < 24 && date.getHours() >= 17
              ? 'Evening'
              : date.getHours() >= 12 && date.getHours() <= 17
              ? 'Afternoon'
              : 'Morning'}
          </p>
          <input
            type='text'
            placeholder='Enter City Name'
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className='input-city'
          />
        </div>
        <div className='clock-container'>
          <p className='clock'>{`${hours ? hours : date.getHours()}:${
            minutes ? minutes : date.getMinutes()
          }:${seconds ? seconds : date.getSeconds()}`}</p>
          <div>
            <p className='city'>{city}</p>
            <p className='weather'>{temp}°C</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
