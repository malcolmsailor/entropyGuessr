import { Button } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { calculateDistributionEntropy } from "../../logic/utils/math";
import { validateAnswer } from "../../logic/game/validation";

export const CalculateButton = () => {
  const {
    answer,
    setGuesses,
    guesses,
    settings,
    setSettings,
    constraints,
    setAnswer,
    setValidationErrors,
  } = useContext(GameContext);

  const calculate = () => {
    const [valid, error_messages] = validateAnswer(
      answer,
      settings,
      constraints
    );

    if (!valid) {
      setValidationErrors(error_messages);
      return;
    }
    const parsedAnswer = answer.split(" ").map(Number);
    const entropy = calculateDistributionEntropy(parsedAnswer);
    const guess = {
      metric: entropy,
      distribution: parsedAnswer,
    };
    const guess_id = Object.keys(guesses).length + 1;
    setGuesses({
      ...guesses,
      [guess_id]: guess,
    });
    setAnswer("");
    setSettings({ ...settings, activeTooltipIndex: guess_id - 1 });
    setValidationErrors(undefined);
  };

  return (
    <Button
      variant="contained"
      onClick={calculate}
      sx={{ marginBottom: 0, width: "100%" }}
    >
      Make guess
    </Button>
  );
};
