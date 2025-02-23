export type TWeatherParam = {
  label: string;
  value: string;
  color1: string;
  color2: string;
};

export const WEATHER_PARAMS: TWeatherParam[] = [
  {
    label: "Temperature °C",
    value: "temperature",
    color1: "red",
    color2: "blue",
  },
  {
    label: "Humidity",
    value: "humidity",
    color1: "grey",
    color2: "pink",
  },
  {
    label: "Pressure",
    value: "pressure",
    color1: "yellow",
    color2: "red",
  },
  {
    label: "Wind",
    value: "wind",
    color1: "skyblue",
    color2: "white",
  },
];
