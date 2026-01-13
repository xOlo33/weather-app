import React from 'react';
import { Sun, CloudRain, CloudLightning, Snowflake, Cloud, Wind, CloudSun } from 'lucide-react';

const WeatherIcon = ({ condition, size = 24 }) => {
  
  switch (condition) {
    case 'Słonecznie':
      return <Sun size={size} color="#f39c12" />;
    case 'Deszcz':
      return <CloudRain size={size} color="#3498db" />;
    case 'Burza':
      return <CloudLightning size={size} color="#8e44ad" />;
    case 'Śnieg':
      return <Snowflake size={size} color="#00d2d3" />;
    case 'Wietrznie':
      return <Wind size={size} color="#95a5a6" />;
    case 'Częściowe zachm.':
    case 'Pochmurno':
    case 'Zachmurzenie':
      return <Cloud size={size} color="#7f8c8d" />;
    default:
      return <CloudSun size={size} color="#f1c40f" />;
  }
};

export default WeatherIcon;