import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { weatherData } from '../data';
import { useSelector, useDispatch } from 'react-redux';
import { formatTemp } from '../utils';
import { toggleFavorite } from '../store';
import UnitSwitcher from '../components/UnitSwitcher';
import WeatherIcon from '../components/WeatherIcon';
import { Star } from 'lucide-react';

const CityList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const unit = useSelector((state) => state.units.value);
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const filteredCities = useMemo(() => {
    return weatherData.filter(city => 
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container">
      <h1>Prognoza Pogody</h1>
      <UnitSwitcher />
      
      <input
        type="text"
        placeholder="Szukaj miasta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="city-list">
        {filteredCities.map((city) => {
          const isFav = favorites.includes(city.id);

          return (
            <div key={city.id} className="city-card">
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <button 
                  onClick={() => dispatch(toggleFavorite(city.id))}
                  style={{
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '5px'
                  }}
                >
                  <Star 
                    size={28} 
                    color={isFav ? "#f1c40f" : "#ccc"} 
                    fill={isFav ? "#f1c40f" : "none"} 
                  />
                </button>

                <WeatherIcon condition={city.condition} size={40} />
                
                <div>
                  <h2 style={{margin: 0}}>{city.city}</h2>
                  <span style={{color: '#666', fontSize: '0.9em'}}>{city.condition}</span>
                </div>
              </div>
              
              <div style={{textAlign: 'right'}}>
                  <p className="temp">{formatTemp(city.temp, unit)}</p>
                  <Link to={`/city/${city.id}`} className="details-btn">
                    Szczegóły
                  </Link>
              </div>
            </div>
          );
        })}
        {filteredCities.length === 0 && <p>Nie znaleziono miast.</p>}
      </div>
    </div>
  );
};

export default CityList;