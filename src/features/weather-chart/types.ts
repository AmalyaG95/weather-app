type TWind = {
  speed: number;
};

export type TListItem = {
  dt_txt: string;
  main: { temp: number; pressure: number; humidity: number };
  wind: TWind;
};

export type TWeather = {
  list?: TListItem[];
};
/*
        pressure: main.pressure,
        humidity: main.humidity,
        wind: wind.speed,


*/
