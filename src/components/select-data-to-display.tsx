import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WEATHER_PARAMS } from "@/constants";
import { selectParam, selectWeatherParam } from "@/features/globalSlice";

const SelectDataToDisplay = () => {
  const dispatch = useAppDispatch();
  const weatherParam = useAppSelector(selectParam);

  const handleValueChange = (inputValue: string) => {
    const selectedParam = WEATHER_PARAMS.find(
      ({ value }) => value === inputValue,
    );

    dispatch(selectWeatherParam(selectedParam!));
  };

  return (
    <Select
      value={weatherParam.value}
      defaultValue={WEATHER_PARAMS[0].value}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Param to Display</SelectLabel>
          {WEATHER_PARAMS.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default React.memo(SelectDataToDisplay);
