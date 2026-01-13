import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import CityList from './views/CityList';
import CityDetails from './views/CityDetails';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<CityList />} />
            <Route path="/city/:id" element={<CityDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;