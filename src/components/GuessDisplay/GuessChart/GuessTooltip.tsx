import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { formatNumber } from "../../../logic/utils/format";
import { TooltipBarChart } from "./TooltipBarChart";
import type { TargetMetric } from "../../../context/GameContext";

interface GuessTooltipProps {
  active?: boolean | undefined;
  payload?: any;
  label?: string;
  target: number;
  metric: TargetMetric;
}

export const GuessTooltip = ({
  active,
  payload,
  target,
  metric,
}: GuessTooltipProps) => {
  if (active && payload && payload.length && payload[0].payload.plotTooltip) {
    const data = payload[0].payload;
    return (
      <Card>
        <CardContent>
          <TooltipBarChart distribution={data.distribution} />
          <Typography variant="body2">
            {metric === "entropy" ? "Entropy" : "Perplexity"}:{" "}
            {formatNumber(data.y)}
          </Typography>
          <Typography variant="body2">
            Error: {formatNumber(Math.abs(data.y - target))}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return null;
};
