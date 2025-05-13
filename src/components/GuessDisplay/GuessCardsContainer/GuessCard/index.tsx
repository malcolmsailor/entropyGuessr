import { Stack, Typography } from "@mui/material";
import { GuessCardContent } from "./GuessCardContent";
import { GuessPlot } from "./GuessPlot";
import type { GuessState } from "../../../../context/GameContext";

interface GuessCardProps {
  id: number;
  guess: GuessState;
}

export const GuessCard = ({ id, guess }: GuessCardProps) => {
  return (
    <Stack direction="column" spacing={2}>
      {/* <Typography variant="h6">Guess {id}</Typography> */}
      <GuessPlot guess={guess} />
      <GuessCardContent distribution={guess.distribution} />
    </Stack>
  );
};
