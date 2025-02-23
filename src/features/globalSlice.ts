import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/app/createAppSlice";
import { TWeatherParam, WEATHER_PARAMS } from "@/constants";

export type GlobalSliceState = {
  cityName: string;
  weatherParam: TWeatherParam;
};

const initialState: GlobalSliceState = {
  cityName: "",
  weatherParam: WEATHER_PARAMS[0],
};

export const globalSlice = createAppSlice({
  name: "global",
  initialState,
  reducers: create => ({
    selectCity: create.reducer((state, { payload }: PayloadAction<string>) => {
      state.cityName = payload;
    }),
    selectWeatherParam: create.reducer(
      (state, { payload }: PayloadAction<TWeatherParam>) => {
        state.weatherParam = payload;
      },
    ),
  }),
  selectors: {
    selectCityName: ({ cityName }) => cityName,
    selectParam: ({ weatherParam }) => weatherParam,
  },
});

export const { selectCity, selectWeatherParam } = globalSlice.actions;
export const { selectCityName, selectParam } = globalSlice.selectors;
