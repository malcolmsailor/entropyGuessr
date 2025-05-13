import { ScatterChart, XAxis, YAxis, ReferenceLine, Scatter } from "recharts";
import type { GuessState } from "../../../../context/GameContext";
import { useContext } from "react";
import { GameContext } from "../../../../context/GameContext";
import chroma from "chroma-js";

interface GuessPlotProps {
  guess: GuessState;
}

const getMaxDistance = (
  target: number,
  minEntropy: number,
  maxEntropy: number
) => {
  return Math.max(Math.abs(target - minEntropy), Math.abs(target - maxEntropy));
};

const getGuessColor = (
  guess: GuessState,
  target: number,
  nearColor: string,
  farColor: string,
  maxEntropy: number
) => {
  const maxDistance = getMaxDistance(target, 0, maxEntropy);
  const distanceProportion = Math.abs(guess.metric - target) / maxDistance;
  return chroma.mix(nearColor, farColor, distanceProportion).hex();
};

export const GuessPlot = (
  { guess }: GuessPlotProps,
  nearColor: string = "#8884d8",
  farColor: string = "#FF5733"
) => {
  const { target, settings } = useContext(GameContext);

  return (
    <ScatterChart width={100} height={400}>
      <YAxis domain={[0, settings.maxEntropy]} hide={true} />
      <XAxis dataKey="x" hide={true} />
      <ReferenceLine
        segment={[
          { x: 0, y: guess.metric },
          { x: 0, y: target },
        ]}
      />
      <Scatter
        data={[{ x: 0, y: guess.metric }]}
        dataKey="y"
        fill={getGuessColor(
          guess,
          target,
          nearColor,
          farColor,
          settings.maxEntropy
        )}
        isAnimationActive={false}
      />
      <Scatter
        data={[{ x: 0, y: target }]}
        dataKey="y"
        fill={nearColor}
        isAnimationActive={false}
      />
    </ScatterChart>
  );
};
