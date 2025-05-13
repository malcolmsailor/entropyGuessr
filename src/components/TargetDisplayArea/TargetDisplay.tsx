import { Typography } from "@mui/material";
import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { NewTargetButton } from "./NewTargetButton";
import { formatNumber } from "../../logic/utils/format";
interface TargetDisplayProps {
  className?: string;
}

export const TargetDisplay: React.FC<TargetDisplayProps> = ({ className }) => {
  const { target, settings } = useContext(GameContext);
  const value = settings.metric === "entropy" ? target : Math.pow(2, target);
  return (
    <Card className={className} sx={{ height: "100%" }}>
      <CardHeader title="Target" />
      <CardContent>
        <Typography variant="h6">{formatNumber(value)}</Typography>
        <NewTargetButton />
      </CardContent>
    </Card>
  );
};
