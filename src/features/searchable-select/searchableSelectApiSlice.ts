import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../api/axiosBaseQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://api.openweathermap.org/",
  }),
  endpoints: builder => ({
    getCities: builder.query<any, string>({
      query: cityName => ({
        url: "geo/1.0/direct",
        method: "GET",
        params: { q: cityName, limit: 10 },
      }),
    }),
    getWeather: builder.query<any, any>({
      query: ({ lat, lon }) => ({
        url: "/data/2.5/forecast",
        method: "GET",
        params: { lat, lon },
      }),
    }),
  }),
});

export const {
  useLazyGetCitiesQuery,
  useGetCitiesQuery,
  useLazyGetWeatherQuery,
  useGetWeatherQuery,
} = apiSlice;
export default apiSlice;
