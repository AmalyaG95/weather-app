import { useAppSelector } from "@/app/hooks";
import { selectParam } from "@/features/globalSlice";
import formatTime from "@/utils/formatTime";
import { TooltipProps } from "recharts";

const ChartCustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  const { label: paramLabel } = useAppSelector(selectParam);
  const { temperature, humidity, pressure, wind } = payload?.[0]?.payload ?? {};

  if (active && payload && payload.length) {
    return (
      <div className="bg-white/70 p-3">
        <h4 className="font-bold">{formatTime(label)}</h4>
        <p>
          <span>{paramLabel}</span> {` : ${temperature}`}
        </p>
        <p>
          <span>Humidity</span> {` : ${humidity}`}
        </p>
        <p>
          <span>Pressure</span> {` : ${pressure}`}
        </p>
        <p>
          <span>Wind</span> {` : ${wind}`}
        </p>
      </div>
    );
  }

  return <></>;
};

export default ChartCustomTooltip;
