import { useContext } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { GameContext } from "../../context/GameContext";

export const ValueLines = () => {
  const { settings, target } = useContext(GameContext);
  const points = {
    minEntropy: 0,
    maxEntropy: settings.maxEntropy,
    target: target,
  };
  const data = [
    { x: 0, ...points },
    { x: 1, ...points },
  ];
  // TODO: (Malcolm 2025-05-06) set the width and height of the chart dynamically
  return (
    <LineChart width={400} height={400} data={data}>
      <YAxis
        domain={[0, settings.maxEntropy]}
        ticks={[0, settings.maxEntropy]}
        tickFormatter={(value) => value.toFixed(2)}
      />
      <XAxis dataKey="x" hide={true} />
      <Line
        type="monotone"
        dataKey="minEntropy"
        stroke="#8884d8"
        dot={false}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="maxEntropy"
        stroke="red"
        dot={false}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="target"
        stroke="blue"
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
};
