import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hourString, getImgSrc } from "./helper";
import ForeCast from "./forecast";

import {
  fetchCurrentWeather,
  fetchWeatherForecast,
  sliceName,
} from "../weather/weatherSlice";
import { Box, Weather } from "./styled";
import styles from "./Counter.module.css";

export function Counter() {
  const dispatch = useDispatch();
  const { current, error } = useSelector((state) => state[sliceName]);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (!!current) {
      dispatch(
        fetchWeatherForecast({
          lat: current?.coord?.lat,
          lon: current?.coord?.lon,
        })
      );
    }
  }, [current, dispatch]);

  const searchCity = () => {
    if (!city) return;
    city && dispatch(fetchCurrentWeather({ query: city }));
  };

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className={styles.button} onClick={searchCity} disabled={!city}>
          Search
        </button>
      </div>
      {current && (
        <div className={styles.row}>
          <Box>
            <span>{current?.name}</span>
            <Weather>
              <div>
                <img
                  alt="weather"
                  src={getImgSrc(current?.weather?.[0]?.icon)}
                />
                <div>{current?.weather?.[0]?.description}</div>
              </div>
              <div>{current?.main?.temp}&#8451;</div>
              <div className={styles["text-left"]}>
                <div>Wind: {current?.wind?.speed} m/s</div>
                <div>Sunrise: {hourString(current?.sys?.sunrise)}</div>
                <div>Sunset: {hourString(current?.sys?.sunset)}</div>
              </div>
            </Weather>
            <ForeCast />
          </Box>
        </div>
      )}
      {error && "City not found"}
    </div>
  );
}
