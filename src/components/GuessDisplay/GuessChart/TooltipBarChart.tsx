import { DistributionBarPlot } from "../../shared/DistributionBarPlot";
import { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";

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
