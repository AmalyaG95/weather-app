import { TCity } from "@/features/searchable-select/types";

type UniqueCity = {
  id: string;
  label: string;
  value: string;
};

const getCitiesOptions = (cities: TCity[]): UniqueCity[] =>
  cities.reduce<UniqueCity[]>((acc, { name, lat, lon }) => {
    if (!acc.some(({ label }) => label === name)) {
      acc.push({
        id: `${lat}-${lon}`,
        label: name,
        value: name.toLowerCase(),
      });
    }
    return acc;
  }, []);

export default getCitiesOptions;
