import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../context/GameContext";
import type { SettingsState } from "../../context/GameContext";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { formatNumber } from "../../logic/utils/format";
interface CanvasLinesProps {
  gridSize: {
    xs?: number;
    sm?: number;
    md?: number;
  };
  initialWidth?: number;
  initialHeight?: number;
}

const drawLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string
) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  fontFamily: React.CSSProperties["fontFamily"]
) => {
  ctx.font = `14px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

const drawCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  settings: SettingsState,
  target: number,
  theme: Theme,
  padding: number
) => {
  const getYcoord = (value: number) => {
    const effectiveHeight = canvas.height - padding * 2;
    return (
      effectiveHeight -
      (value / settings.maxEntropy) * effectiveHeight +
      padding
    );
  };

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  console.log(padding);
  console.log(canvas.height);

  // Set line styles
  ctx.lineWidth = 2;

  // Draw minEntropy line (at y=0)
  drawLine(
    ctx,
    0 + padding,
    0 + padding,
    canvas.width - padding,
    0 + padding,
    "#8884d8"
  );
  drawText(
    ctx,
    "Minimum: 0",
    10,
    canvas.height,
    "#8884d8",
    theme.typography.fontFamily
  );

  // Draw maxEntropy line
  const maxEntropyY = getYcoord(settings.maxEntropy);
  drawLine(
    ctx,
    0 + padding,
    maxEntropyY,
    canvas.width - padding,
    maxEntropyY,
    "red"
  );
  drawText(
    ctx,
    `Maximum: ${formatNumber(settings.maxEntropy)}`,
    10,
    maxEntropyY,
    "red",
    theme.typography.fontFamily
  );

  // Draw target line
  const targetY = getYcoord(target);
  drawLine(ctx, 0 + padding, targetY, canvas.width - padding, targetY, "blue");
  drawText(
    ctx,
    `Target: ${formatNumber(target)}`,
    10,
    targetY,
    "blue",
    theme.typography.fontFamily
  );
};

export const CanvasLines = ({
  gridSize,
  initialWidth = 400,
  initialHeight = 400,
}: CanvasLinesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { settings, target } = useContext(GameContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialWidth);
  const theme = useTheme();

  // Draw the lines on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawCanvas(
      canvas,
      ctx,
      settings,
      target,
      theme,
      parseInt(theme.spacing(2), 10)
    );
  }, [width, settings.maxEntropy, target]);

  // Resize the canvas when the container is resized
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Grid size={gridSize} ref={containerRef} sx={{ px: 2 }}>
      <canvas ref={canvasRef} width={width} height={initialHeight} />
    </Grid>
  );
};
