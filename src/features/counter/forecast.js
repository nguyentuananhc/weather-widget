import React from "react";
import { Forecast } from "./styled";
import { useSelector } from "react-redux";
import { dateString, getImgSrc } from "./helper";
import { selectForecast } from "../weather/weatherSlice";

export default function ForecastContainer() {
  const data = useSelector(selectForecast);
  const [filtedData, setFiltedData] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      const newData = data.slice(0, 5);
      setFiltedData(newData);
    }
  }, [data]);

  return (
    <Forecast>
      {filtedData.map((item, index) => (
        <div key={index}>
          <div>{dateString(item?.dt)}</div>
          <img alt="weather" src={getImgSrc(item?.weather?.[0]?.icon)} />
          <div>{item?.temp?.eve}&#8451;</div>
        </div>
      ))}
    </Forecast>
  );
}
