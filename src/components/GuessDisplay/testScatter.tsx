import { useContext } from "react";
import {
  CartesianGrid,
  Tooltip,
  ZAxis,
  YAxis,
  XAxis,
  ScatterChart,
  Scatter,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine,
} from "recharts";
import { GameContext } from "../../context/GameContext";
export const ScatterChartTest = () => {
  const { target, settings } = useContext(GameContext);
  const minValue = 0;
  const maxValue = settings.maxEntropy;
  const data01 = [
    { x: 1, y: 1, z: 1 },
    { x: 2, y: target, z: 1 },
    { x: 3, y: maxValue, z: 1 },
    { x: 4, y: minValue, z: 1 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="number" domain={[0, 8]} axisLine={false} />
        <YAxis dataKey="y" type="number" name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <ReferenceLine y={target} stroke="#ff7300" />
        <Scatter name="A school" data={data01} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
