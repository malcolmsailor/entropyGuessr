import React from "react";
import { BarChart, Bar, YAxis } from "recharts";

interface DistributionBarPlotProps {
  distribution: number[];
  width?: number;
  height?: number;
}

export const DistributionBarPlot: React.FC<DistributionBarPlotProps> = ({
  distribution,
  width = 400,
  height = 200,
}) => {
  const data = distribution.map((value, index) => ({
    name: index,
    value,
  }));
  // Multiply by 1.3 to leave space for labels
  const yMax = Math.max(1, Math.max(...distribution) * 1.3);

  return (
    <BarChart width={width} height={height} data={data}>
      <YAxis domain={[0, yMax]} hide={true} />
      <Bar
        dataKey="value"
        fill="#8884d8"
        label={{
          position: "top",
          fontSize: 12,
          fill: "#666",
          formatter: (value: number) => (value === 0 ? "" : value),
        }}
        isAnimationActive={false}
      />
    </BarChart>
  );
};
