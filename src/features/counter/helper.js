import moment from "moment";

export const currentDate = moment().unix();
export const hourString = (value) => moment.unix(value).format("LT");
export const dateString = (value) => moment.unix(value).format("dd");
export const getImgSrc = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;
