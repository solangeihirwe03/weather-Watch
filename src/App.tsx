import { useState } from 'react';
import axios from 'axios';
import weatherBackgrounds from './components/cloud';
import { IoIosSearch } from "react-icons/io";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    main: string;
  }[];
}

const api = {
  key: "181af592399008f9a0ae875bba6d2aea",
  base: "https://api.openweathermap.org/data/2.5/weather"
}

const getBackgroundClass = (weather: WeatherData | null): string => {
  if (!weather) return 'bg-none border border-2 rounded-3xl'; // Default background color

  const condition = weather.weather[0].main.toLowerCase();
  return weatherBackgrounds[condition] || 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300';
}


function App() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null)

  const handleSearch = async () => {
    axios.get<WeatherData>(`${api.base}?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        console.log(res.data)
        setWeather(res.data)
      }
      )
  }

  return (
    <div className={`w-full h-[100vh] bg-[url(background.jpg)] bg-cover bg-no-repeat flex flex-col lg:flex-row lg:justify-around items-center justify-center px-10`}>
      <p className='px-4 text-lg text-white mb-3 lg:text-[36px] w-[50vw] leading-[42px]'>Stay informed and prepared with accurate weather forecasts.</p>
      <div className={`xl:w-[40vw] h-[60vh] xl:h-[60vh] ${getBackgroundClass(weather)} p-3 lg:p-10`}>
        <div className='flex'>
        <input type="search" placeholder='enter your city...' value={search} onChange={e => setSearch(e.target.value)} className='h-10 px-4 rounded-full bg-none border border-black outline-none' />
        <button onClick={handleSearch} className='text-white'>
          <IoIosSearch fontSize={30}/>
          </button>
        </div>
        {weather && (
          <div className='py-6 space-x-4 space-y-3'>
            <p className='pl-4'>{weather.name}</p>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App
