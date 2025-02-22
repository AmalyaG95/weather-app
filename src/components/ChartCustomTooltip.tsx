import formatTime from "@/utils/formatTime";
import { TooltipProps } from "recharts";

const ChartCustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/70 p-3">
        <p>
          <strong>{formatTime(label)}</strong> {` : ${payload[0].value}°C`}
        </p>
        <p>
          <strong>Humidity</strong> {` : ${payload[0].payload.humidity}`}
        </p>
        <p>
          <strong>Pressure</strong>
          {` : ${payload[0].payload.pressure}`}
        </p>
        <p>
          <strong>Wind</strong>
          {` : ${payload[0].payload.wind}`}
        </p>
      </div>
    );
  }

  return <></>;
};

export default ChartCustomTooltip;
