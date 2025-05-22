import { Typography, Divider } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import { CardContent } from "@mui/material";
import { formatNumber } from "../../../logic/utils/format";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { NewTargetButton } from "./NewTargetButton";

export const ResultsCard = () => {
  const cardStyle = {
    height: "100%",
    backgroundColor: "primary.main",
    color: "primary.contrastText",
  };
  const { target, guesses, settings } = useContext(GameContext);
  const noGuesses = Object.keys(guesses).length === 0;
  const targetValue =
    settings.metric === "entropy" ? target : Math.pow(2, target);

  var content = <></>;
  var lastGuess = null;
  if (!noGuesses) {
    lastGuess = Object.keys(guesses)[Object.keys(guesses).length - 1];
    const entropy = guesses[lastGuess].metric;
    const guessValue =
      settings.metric === "entropy" ? entropy : Math.pow(2, entropy);
    content = (
      <>
        <Typography variant="h5">
          <span style={{ fontWeight: "bold" }}>
            Actual {settings.metric.toLowerCase()}:
          </span>{" "}
          <br />
          <span style={{ fontWeight: "normal" }}>
            {formatNumber(guessValue)}
          </span>
        </Typography>
        <Typography variant="h5">
          <span style={{ fontWeight: "bold" }}>Error:</span> <br />
          <span style={{ fontWeight: "normal" }}>
            {formatNumber(Math.abs(guessValue - targetValue))}
          </span>
        </Typography>
      </>
    );
  }
  return (
    <Card sx={cardStyle}>
      <Box
        justifyContent="center"
        height="100%"
        sx={{
          "& .MuiTypography-root": {
            textAlign: "center",
            marginY: 1.3,
          },
        }}
      >
        <CardContent sx={{ padding: { xs: 0.5, sm: 1 } }}>
          <Typography variant="h5">
            <span style={{ fontWeight: "bold" }}>
              Target {settings.metric.toLowerCase()}:
            </span>{" "}
            <br />
            <span style={{ fontWeight: "normal" }}>
              {formatNumber(targetValue)}
            </span>
          </Typography>
          <NewTargetButton />
          <Typography variant="h6">
            {noGuesses ? "No guesses yet" : `Guess ${lastGuess}`}
          </Typography>
          <Divider variant="middle" sx={{ bgcolor: "primary.contrastText" }} />
          {content}
        </CardContent>
      </Box>
    </Card>
  );
};
