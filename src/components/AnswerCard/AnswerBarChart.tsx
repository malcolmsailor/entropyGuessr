import { DistributionBarPlot } from "../shared/DistributionBarPlot";
import { useContext, useState, useRef, useEffect } from "react";
import { GameContext } from "../../context/GameContext";
import { Grid } from "@mui/material";

interface AnswerBarChartProps {
  gridSize: {
    xs?: number;
    sm?: number;
    md?: number;
  };
}

export const AnswerBarChart = ({ gridSize }: AnswerBarChartProps) => {
  const { answer, settings } = useContext(GameContext);
  const parsedAnswer = answer.split(" ").map(Number);
  while (parsedAnswer.length < settings.numOutcomes) {
    parsedAnswer.push(0);
  }

  const containerRef = useRef(null);
  const [width, setWidth] = useState(400);
  const height = 50;

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const labelBars = settings.numOutcomes <= 4;

  return (
    <Grid
      size={gridSize}
      ref={containerRef}
      sx={{ marginTop: -1, marginBottom: 0 }}
    >
      <DistributionBarPlot
        width={width}
        height={height}
        distribution={parsedAnswer}
        labelBars={labelBars}
      />
    </Grid>
  );
};
