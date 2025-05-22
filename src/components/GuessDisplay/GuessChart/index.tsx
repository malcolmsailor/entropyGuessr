import React, { PureComponent, useContext } from "react";
import {
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ScatterChart,
  Cell,
} from "recharts";
import { Box, CardContent, Card, useTheme, useMediaQuery } from "@mui/material";
import { formatNumber } from "../../../logic/utils/format";
import { GameContext } from "../../../context/GameContext";
import chroma from "chroma-js";
import { GuessTooltip } from "./GuessTooltip";

const getMaxDistance = (
  target: number,
  minEntropy: number,
  maxEntropy: number
) => {
  return Math.max(Math.abs(target - minEntropy), Math.abs(target - maxEntropy));
};

const getGuessColor = (
  guess_value: number,
  target: number,
  nearColor: string,
  farColor: string,
  maxEntropy: number
) => {
  const maxDistance = getMaxDistance(target, 0, maxEntropy);
  const distanceProportion = Math.abs(guess_value - target) / maxDistance;
  return chroma.mix(nearColor, farColor, distanceProportion).hex();
};

interface GuessChartProps {}

interface XAxisTickProps {
  x: number;
  y: number;
  stroke: string;
  payload: { value: number };
  fontFamily: React.CSSProperties["fontFamily"];
  fontSize: React.CSSProperties["fontSize"];
}

class RotatedXAxisTick extends PureComponent<XAxisTickProps> {
  render() {
    const { x, y, stroke, payload, fontFamily, fontSize } = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill={stroke}
          fontFamily={fontFamily}
          fontSize={fontSize}
          transform="rotate(-35)"
        >
          {`Guess ${payload.value}`}
        </text>
      </g>
    );
  }
}

export const GuessChart: React.FC<GuessChartProps> = () => {
  const { guesses, target, settings } = useContext(GameContext);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const scatterData = Object.keys(guesses).map((key) => ({
    x: Number(key),
    y:
      settings.metric === "entropy"
        ? guesses[key].metric
        : Math.pow(2, guesses[key].metric),
    z: 0,
    distribution: guesses[key].distribution,
    plotTooltip: true,
  }));

  const minValue = settings.metric === "entropy" ? 0 : 1;
  const maxValue =
    settings.metric === "entropy"
      ? settings.maxEntropy
      : Math.pow(2, settings.maxEntropy);
  const targetValue =
    settings.metric === "entropy" ? target : Math.pow(2, target);

  const numGuesses = Object.keys(guesses).length;
  const xMax = numGuesses < 5 ? 5 * 1.333 : numGuesses * 1.333;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            minHeight: "200px",
            maxHeight: "500px",
            height: "100%",
          }}
        >
          <ResponsiveContainer minHeight={200}>
            <ScatterChart margin={{ top: 0, right: 0, bottom: 20, left: 5 }}>
              <XAxis
                dataKey="x"
                name="Guess"
                axisLine={false}
                domain={[0, xMax]}
                type="number"
                ticks={Object.keys(guesses).map(Number)}
                tickLine={{ stroke: theme.customColors.min }}
                tick={
                  Object.keys(guesses).length > 0
                    ? (props) => (
                        <RotatedXAxisTick
                          {...props}
                          // for a reason that is unclear to me the default stroke is "none"
                          // leading to the text not being visible
                          stroke={theme.customColors.min}
                          fontFamily={theme.typography.fontFamily}
                          fontSize={isXs ? ".75rem" : ".875rem"}
                        />
                      )
                    : false
                }
              />
              <YAxis
                dataKey="y"
                name="Entropy"
                type="number"
                axisLine={false}
                width={0}
                domain={[minValue, maxValue]}
                tick={false}
              />
              <Tooltip
                cursor={false}
                isAnimationActive={false}
                content={(props) => (
                  <GuessTooltip
                    {...props}
                    target={targetValue}
                    metric={settings.metric}
                  />
                )}
                defaultIndex={settings.activeTooltipIndex}
              />

              {/* Reference lines for min, max and target values */}
              <ReferenceLine
                y={minValue}
                stroke={theme.customColors.min}
                strokeDasharray="3 3"
                label={{
                  value: `Minimum ${settings.metric.toLowerCase()}: ${formatNumber(
                    minValue
                  )}`,
                  position: "insideRight",
                  fill: theme.customColors.min,
                  dy: -10,
                }}
              />
              <ReferenceLine
                y={maxValue}
                stroke={theme.customColors.max}
                strokeDasharray="3 3"
                label={{
                  value: `Maximum ${settings.metric.toLowerCase()}: ${formatNumber(
                    maxValue
                  )}`,
                  position: "insideRight",
                  fill: theme.customColors.max,
                  dy: -10,
                }}
              />
              <ReferenceLine
                y={targetValue}
                stroke={theme.customColors.target}
                label={{
                  value: `Target ${settings.metric.toLowerCase()}: ${formatNumber(
                    targetValue
                  )}`,
                  position: "insideRight",
                  fill: theme.customColors.target,
                  dy: maxValue - targetValue > 0.1 ? -10 : 12,
                }}
              />

              {/* Vertical lines showing distance to target */}
              {scatterData.map((entry) => (
                <ReferenceLine
                  key={`distance-${entry.x}`}
                  segment={[
                    { x: entry.x, y: entry.y },
                    { x: entry.x, y: targetValue },
                  ]}
                />
              ))}

              {/* Scatter plot for the guesses */}
              <Scatter
                name="Guesses"
                fill="#ccc"
                data={scatterData}
                isAnimationActive={false}
              >
                {scatterData.map((entry, index) => {
                  const color = getGuessColor(
                    entry.y,
                    targetValue,
                    theme.customColors.target,
                    theme.customColors.errorColor,
                    settings.maxEntropy
                  );
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GuessChart;
