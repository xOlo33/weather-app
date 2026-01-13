import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('weatherAppState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('weatherAppState', serializedState);
  } catch {
  }
};

const unitsSlice = createSlice({
  name: 'units',
  initialState: { value: 'C' },
  reducers: {
    setUnit: (state, action) => {
      state.value = action.payload;
    },
  },
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const cityId = action.payload;
      if (state.items.includes(cityId)) {
        state.items = state.items.filter((id) => id !== cityId);
      } else {
        state.items.push(cityId);
      }
    },
  },
});

export const { setUnit } = unitsSlice.actions;
export const { toggleFavorite } = favoritesSlice.actions;

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    units: unitsSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    units: store.getState().units,
    favorites: store.getState().favorites,
  });
});