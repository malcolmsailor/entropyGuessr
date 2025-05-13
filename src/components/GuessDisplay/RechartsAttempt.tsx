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
import { Box, CardContent, Card, Typography, useTheme } from "@mui/material";
import { formatNumber } from "../../logic/utils/format";
import { GameContext, type TargetMetric } from "../../context/GameContext";
import chroma from "chroma-js";
import { applySpacing } from "../../theme";
import { DistributionBarPlot } from "../shared/DistributionBarPlot";
import { useRef, useState, useEffect } from "react";

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

interface YAxisTickProps {
  x: number;
  y: number;
  stroke: string;
  payload: { value: number };
  target: number;
  maxEntropy: number;
  fontFamily: React.CSSProperties["fontFamily"];
  maxColor: string;
  minColor: string;
  targetColor: string;
}

class ColoredYAxisTick extends PureComponent<YAxisTickProps> {
  render() {
    const {
      x,
      y,
      payload,
      target,
      maxEntropy,
      fontFamily,
      maxColor,
      minColor,
      targetColor,
    } = this.props;
    const minValue = 0;
    const maxValue = maxEntropy;

    var content1: string;
    var content2: string;
    var color: string;

    if (payload.value === target) {
      content1 = "Target";
      content2 = formatNumber(target);
      color = targetColor;
    } else if (payload.value === minValue) {
      content1 = "Minimum";
      content2 = formatNumber(minValue);
      color = minColor;
    } else if (payload.value === maxValue) {
      content1 = "Maximum";
      content2 = formatNumber(maxValue);
      color = maxColor;
    } else {
      throw new Error("Invalid payload value");
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} fill={color} fontFamily={fontFamily} textAnchor="end">
          <tspan x={0} y={-20}>
            {content1}
          </tspan>
          <tspan x={0} y={0}>
            entropy:
          </tspan>
          <tspan x={0} y={20}>
            {content2}
          </tspan>
        </text>
      </g>
    );
  }
}

interface XAxisTickProps {
  x: number;
  y: number;
  stroke: string;
  payload: { value: number };
  fontFamily: React.CSSProperties["fontFamily"];
}

class RotatedXAxisTick extends PureComponent<XAxisTickProps> {
  render() {
    const { x, y, stroke, payload, fontFamily } = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill={stroke}
          fontFamily={fontFamily}
          transform="rotate(-35)"
        >
          {`Guess ${payload.value}`}
        </text>
      </g>
    );
  }
}

interface GuessTooltipProps {
  active?: boolean | undefined;
  payload?: any;
  label?: string;
  target: number;
  metric: TargetMetric;
}

interface TooltipBarChartProps {
  distribution: number[];
}

export const TooltipBarChart = ({ distribution }: TooltipBarChartProps) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(50);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      setHeight(entries[0].contentRect.height);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box sx={{ width: "100%" }} ref={containerRef}>
      <DistributionBarPlot
        width={width}
        height={height}
        distribution={distribution}
      />
    </Box>
  );
};

const GuessTooltip = ({
  active,
  payload,
  label,
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

export const GuessChart: React.FC<GuessChartProps> = () => {
  const { guesses, target, settings } = useContext(GameContext);
  const theme = useTheme();

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

  // targetData is not needed if we aren't plotting targets as points on the scatterplot
  // If there's a way to do this without creating a new array, I don't know it.
  // Ideally, we would just add another key to the scatterData array, but
  // `dataKey` doesn't seem to do anything when provided as a prop to the
  // Scatter component.
  // const targetData = Object.keys(guesses).map((key) => ({
  //   x: Number(key),
  //   y: target,
  //   z: 0,
  //   distribution: [],
  //   plotTooltip: false,
  // }));

  return (
    <Card>
      <CardContent>
        <Box sx={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <ScatterChart
              // Left margin has to be sufficient for Y tick labels to appear to left of plot
              margin={applySpacing(
                theme.customValues.guessScatterMargins,
                theme.spacing(1)
              )}
            >
              <XAxis
                dataKey="x"
                name="Guess"
                axisLine={false}
                domain={[0, 8]}
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
              {/* <Legend /> */}

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
              {/* Scatter plot for the targets */}
              {/* <Scatter name="Targets" fill="#ccc" data={targetData}>
            {targetData.map((entry, index) => {
              return (
                <Cell
                  key={`target-cell-${index}`}
                  fill={theme.customColors.target}
                />
              );
            })}
          </Scatter> */}
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GuessChart;
