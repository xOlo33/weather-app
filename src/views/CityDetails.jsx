import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { weatherData } from '../data';
import { useSelector } from 'react-redux';
import { formatTemp } from '../utils';
import UnitSwitcher from '../components/UnitSwitcher';
import WeatherIcon from '../components/WeatherIcon'; 
import { Cloud, Wind, Droplets } from 'lucide-react'; 

const CityDetails = () => {
  const { id } = useParams();
  const unit = useSelector((state) => state.units.value);

  const city = useMemo(() => {
    return weatherData.find(c => c.id === parseInt(id));
  }, [id]);

  if (!city) return <div>Nie znaleziono miasta!</div>;

  return (
    <div className="container details-view">
      <Link to="/" className="back-link">← Powrót do listy</Link>
      <UnitSwitcher />

      <div className="main-info">
        <h1>{city.city}</h1>
        <div className="current-weather">
          {/* DUŻA IKONA POGODY */}
          <div style={{ margin: '20px 0' }}>
            <WeatherIcon condition={city.condition} size={100} />
          </div>
          
          <span className="big-temp">{formatTemp(city.temp, unit)}</span>
          <span className="condition">{city.condition}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
            <Droplets size={20} />
            <p>Opady: {city.precipProb}% ({city.precipAmount} mm)</p>
        </div>
        <div className="stat-box">
            <Wind size={20} />
            <p>Wiatr: {city.windSpeed} km/h ({city.windDir})</p>
        </div>
        <div className="stat-box">
            <Cloud size={20} />
            <p>Zachmurzenie: {city.clouds}%</p>
        </div>
      </div>

      <h3>Prognoza na 5 dni</h3>
      <div className="forecast-list">
        {city.forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <span style={{width: '100px'}}>{day.day}</span>
            
            {/* Mała ikonka w prognozie */}
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <WeatherIcon condition={day.condition} size={24} />
                <span>{day.condition}</span>
            </div>
            
            <strong>{formatTemp(day.temp, unit)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityDetails;