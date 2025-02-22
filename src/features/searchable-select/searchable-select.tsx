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

const SearchableSelect = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const city = useAppSelector(selectCityName);
  const [getCities, { data: cities = [] }] = useLazyGetCitiesQuery();
  const [getWeather] = useLazyGetWeatherQuery();
  const availableOptions =
    cities.map(({ name, lat, lon }) => ({
      id: `${lat}-${lon}`,
      label: name,
      value: name.toLowerCase(),
    })) ?? [];

  const handleGetCity = ({ currentTarget: { value } }) => {
    getCities(value, true);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between mt-36"
          >
            {city
              ? availableOptions.find(option => option.value === city)?.label
              : "Select a city..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
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

export default SearchableSelect;
