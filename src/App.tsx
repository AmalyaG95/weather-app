import "./App.css";
import { useAppSelector } from "./app/hooks";
import { selectCityName } from "./features/globalSlice";
import SearchableSelect from "./features/searchable-select/searchable-select";
import WeatherChart from "./features/weather-chart/weather-chart";

const App = () => {
  const city = useAppSelector(selectCityName);

  return (
    <div className="App">
      <header>
        <SearchableSelect />
      </header>
      <main>{!!city && <WeatherChart />}</main>
    </div>
  );
};

export default App;
