import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnit } from '../store';

const UnitSwitcher = () => {
  const unit = useSelector((state) => state.units.value);
  const dispatch = useDispatch();
  return (
    <div className="unit-switcher">
      <label>Jednostka: </label>
      <select value={unit} onChange={(e) => dispatch(setUnit(e.target.value))}>
        <option value="C">Celsjusz</option>
        <option value="F">Fahrenheit</option>
        <option value="K">Kelvin</option>
      </select>
    </div>
  );
};
export default UnitSwitcher;