import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import weatherAPI from "../../api";

export const sliceName = "weather";

export const fetchCurrentWeather = createAsyncThunk(
  `${sliceName}/fetchCurrentWeather`,
  ({ query }) => weatherAPI.fetchCurrentWeather({ query })
);

export const fetchWeatherForecast = createAsyncThunk(
  `${sliceName}/fetchWeatherForecast`,
  ({ lat, lon }) => weatherAPI.fetchWeatherForecast({ lat, lon })
);

const initialState = {
  current: null,
  forecast: null,
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrentWeather.pending]: (state, { payload, meta }) => {
      // state = initialState;
      state.loading = true;
      state.error = null;
    },
    [fetchCurrentWeather.fulfilled]: (state, { payload, meta }) => {
      state.loading = false;
      state.current = payload.data;
    },
    [fetchCurrentWeather.rejected]: (state, { error, meta }) => {
      state.loading = false;
      state.error = error;
      state.current = null;
      state.forecast = null;
    },
    [fetchWeatherForecast.pending]: (state, { payload, meta }) => {
      state.loading = true;
      state.error = null;
    },
    [fetchWeatherForecast.fulfilled]: (state, { payload, meta }) => {
      state.loading = false;
      state.forecast = payload.data;
    },
    [fetchWeatherForecast.rejected]: (state, { error, meta }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const selectCurrent = (state) => state[sliceName].current;
export const selectForecast = (state) =>
  state[sliceName]?.forecast?.daily || [];

export default weatherSlice.reducer;
