import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  useGetCitiesQuery,
  useGetWeatherQuery,
} from "../searchable-select/searchableSelectApiSlice";
import { selectCityName } from "../globalSlice";
import { useAppSelector } from "@/app/hooks";
import ChartCustomTooltip from "@/components/ChartCustomTooltip";
import formatTime from "@/utils/formatTime";
import { memo, useMemo } from "react";

const WeatherChart = () => {
  const city = useAppSelector(selectCityName);
  const { data: cities = [] } = useGetCitiesQuery(city);
  const { data: weather = {} } = useGetWeatherQuery(
    {
      lat: cities[0]?.lat,
      lon: cities[0]?.lon,
    },
    { skip: !cities.length },
  );

  const data = useMemo(
    () =>
      weather?.list?.map(item => ({
        time: item.dt_txt,
        temperature: Math.round(item.main.temp - 273.15),
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        wind: item.wind.speed,
      })) ?? [],
    [],
  );

  const gradientOffset = () => {
    const dataMax = Math.max(...data?.map(i => i.temperature));
    const dataMin = Math.min(...data?.map(i => i.temperature));
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <>
      {(!!city || !!cities.length) && (
        <div className="w-full h-[400px] p-6">
          <ResponsiveContainer>
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={formatTime}
                angle={-35}
                textAnchor="end"
                height={70}
              />
              <YAxis
                label={{
                  value: "Temperature (°C)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<ChartCustomTooltip />} />
              <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={off} stopColor="red" stopOpacity={1} />
                  <stop offset={off} stopColor="blue" stopOpacity={1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#000"
                fill="url(#splitColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default memo(WeatherChart);
