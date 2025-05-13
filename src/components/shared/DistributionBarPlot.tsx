import React from "react";
import { BarChart, Bar, YAxis } from "recharts";
import { useTheme } from "@mui/material/styles";
interface DistributionBarPlotProps {
  distribution: number[];
  width?: number;
  height?: number;
  labelBars?: boolean;
}

export const DistributionBarPlot: React.FC<DistributionBarPlotProps> = ({
  distribution,
  width = 400,
  height = 200,
  labelBars = true,
}) => {
  const data = distribution.map((value, index) => ({
    name: index,
    value,
  }));
  // Multiply by 1.3 to leave space for labels
  const yMax = Math.max(1, Math.max(...distribution) * 1.3);
  const theme = useTheme();
  return (
    <BarChart width={width} height={height} data={data}>
      <YAxis domain={[0, yMax]} hide={true} />
      <Bar
        dataKey="value"
        fill={theme.customColors.target}
        label={
          labelBars
            ? {
                position: "top",
                fontSize: 12,
                fill: theme.palette.text.secondary,
                formatter: (value: number) => (value === 0 ? "" : value),
              }
            : undefined
        }
        isAnimationActive={false}
      />
    </BarChart>
  );
};
