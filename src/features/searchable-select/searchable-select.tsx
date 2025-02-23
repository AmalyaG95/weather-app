import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useLazyGetCitiesQuery,
  useLazyGetWeatherQuery,
} from "@/features/searchable-select/searchableSelectApiSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCity, selectCityName } from "../globalSlice";
import SelectDataToDisplay from "@/components/select-data-to-display";
import getCitiesOptions from "@/utils/getAvailableOptions";

const SearchableSelect = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const city = useAppSelector(selectCityName);
  const [getCities, { data: cities = [] }] = useLazyGetCitiesQuery();
  const [getWeather] = useLazyGetWeatherQuery();
  const availableOptions = getCitiesOptions(cities) ?? [];

  const handleGetCity = ({ currentTarget: { value } }) => {
    getCities(value, true);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex justify-center relative pt-36 gap-2">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {city
              ? availableOptions.find(option => option.value === city)?.label
              : "Select a city..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-1 opacity-50" />
          </Button>
        </PopoverTrigger>
        <SelectDataToDisplay />
        <PopoverContent className="w-[200px] p-0 absolute!">
          <Command>
            <CommandInput
              placeholder="Search a city..."
              onChangeCapture={handleGetCity}
            />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {availableOptions.map(({ id, value: optionValue, label }) => (
                  <CommandItem
                    key={id}
                    value={optionValue}
                    onSelect={currentValue => {
                      dispatch(selectCity(currentValue.toLowerCase()));
                      getWeather(
                        { lat: cities[0].lat, lon: cities[0].lon },
                        true,
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        optionValue === city ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default React.memo(SearchableSelect);
