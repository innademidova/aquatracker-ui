import { WaterConsumptionResponse } from "@/app/api/waterApi.ts";
import { getFullDate } from "@/shared/utils/dateHelper";
import { getDailyConsumptionAmount } from "@/shared/utils/waterInfoHelper";
import dayjs from "dayjs";
import React, { FC, useRef, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

interface DataPoint {
  day: number;
  amount: number;
}

interface WaterConsumptionChartProps {
  days: number[];
  currentDate: dayjs.Dayjs;
  monthlyWaterConsumption: WaterConsumptionResponse[] | undefined;
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].value} L`}</p>
      </div>
    );
  }

  return null;
};

const WaterConsumptionChart: FC<WaterConsumptionChartProps> = ({
  days,
  currentDate,
  monthlyWaterConsumption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const mapDaysToData = (): DataPoint[] => {
    return days.map(
      (el) =>
        ({
          day: el,
          amount:
            getDailyConsumptionAmount(
              getFullDate(currentDate, el),
              monthlyWaterConsumption
            ) / 1000,
        } as DataPoint)
    );
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        overflow: "hidden",
        userSelect: "none",
        width: "100%",
        height: "300px",
        position: "relative",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
    >
      <div style={{ width: `${days.length * 88}px`, height: "100%" }}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={mapDaysToData()}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="1.54%" stopColor="#9BE1A0" />
                <stop offset="93.64%" stopColor="rgba(155, 225, 160, 0)" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" interval={0} padding={{ left: 5, right: 5 }} />
            <YAxis
              dataKey="amount"
              ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
              tickFormatter={(tick) => `${tick} L`}
              domain={[0, 2.5]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              fill="url(#colorUv)"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#87D28D"
              strokeWidth={3}
              dot={{ r: 5, fill: "#fff", stroke: "#87D28D", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WaterConsumptionChart;
