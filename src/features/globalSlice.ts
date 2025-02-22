import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/app/createAppSlice";

export type GlobalSliceState = {
  cityName: string;
};

const initialState: GlobalSliceState = {
  cityName: "",
};

export const globalSlice = createAppSlice({
  name: "global",
  initialState,
  reducers: create => ({
    selectCity: create.reducer((state, { payload }: PayloadAction<string>) => {
      state.cityName = payload;
    }),
  }),
  selectors: {
    selectCityName: ({ cityName }) => cityName,
  },
});

export const { selectCity } = globalSlice.actions;
export const { selectCityName } = globalSlice.selectors;
