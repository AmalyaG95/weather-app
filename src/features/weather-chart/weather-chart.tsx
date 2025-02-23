import * as React from "react";
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
import { selectCityName, selectParam } from "../globalSlice";
import { useAppSelector } from "@/app/hooks";
import ChartCustomTooltip from "@/components/chart-custom-tooltip";
import formatTime from "@/utils/formatTime";
import getGradientOffset from "@/utils/getGradientOffset";
import { TListItem } from "./types";

const WeatherChart = () => {
  const city = useAppSelector(selectCityName);
  const { label, value, color1, color2 } = useAppSelector(selectParam);
  const { data: cities = [] } = useGetCitiesQuery(city);
  const { data: weather = {} } = useGetWeatherQuery(
    {
      lat: cities[0]?.lat,
      lon: cities[0]?.lon,
    },
    { skip: !cities.length },
  );

  const data = React.useMemo(
    () =>
      weather?.list?.map(({ dt_txt, main, wind }: TListItem) => ({
        time: dt_txt,
        temperature: Math.round(main.temp - 273.15),
        pressure: main.pressure,
        humidity: main.humidity,
        wind: wind.speed,
      })) ?? [],
    [weather],
  );

  const off = React.useMemo(
    () => getGradientOffset(data?.map(({ temperature }) => temperature)),
    [data],
  );

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
                  value: label,
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<ChartCustomTooltip />} />
              <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={off} stopColor={color1} stopOpacity={1} />
                  <stop offset={off} stopColor={color2} stopOpacity={1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey={value}
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

export default React.memo(WeatherChart);
