import { GameContext } from "../../../context/GameContext";
import { GuessCard } from "./GuessCard";
import { Stack } from "@mui/material";
import { useContext } from "react";
const GuessCardsContainer = () => {
  const { guesses } = useContext(GameContext);

  return (
    <Stack direction="row" spacing={2} sx={{ ml: 10 }}>
      {Object.keys(guesses)
        .sort((a, b) => Number(b) - Number(a))
        .map((key) => (
          <GuessCard key={key} id={Number(key)} guess={guesses[Number(key)]} />
        ))}
    </Stack>
  );
};

export default GuessCardsContainer;
