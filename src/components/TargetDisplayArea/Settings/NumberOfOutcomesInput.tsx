import { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import { TextField } from "@mui/material";
import { generateNewTarget } from "../../../logic/game/generateNewTarget";
export const NumberOfOutcomesInput = () => {
  const { settings, setSettings, setGuesses, setTarget } =
    useContext(GameContext);

  const parseInput = (input: string) => {
    const parsed = parseInt(input);
    if (parsed >= 2 && parsed <= 50) {
      return parsed;
    }
    return null;
  };

  const updateNumOutcomes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      numOutcomesRaw: event.target.value,
    });
    try {
      const newNumOutcomes = parseInput(event.target.value);
      if (newNumOutcomes) {
        setSettings({
          ...settings,
          numOutcomes: newNumOutcomes,
          numOutcomesRaw: event.target.value,
          maxEntropy: Math.log2(newNumOutcomes),
        });
        setGuesses({});
        setTarget(generateNewTarget(newNumOutcomes));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const label = "Number of Outcomes";
  return (
    <div>
      {" "}
      <TextField
        label={label}
        type="number"
        sx={{ width: "100%" }}
        value={settings.numOutcomesRaw}
        onChange={updateNumOutcomes}
        slotProps={{
          htmlInput: { min: 2, max: 50 },
        }}
        error={
          settings.numOutcomesRaw &&
          parseInput(settings.numOutcomesRaw) === null
        }
        helperText={
          settings.numOutcomesRaw &&
          parseInput(settings.numOutcomesRaw) === null
            ? "Number of outcomes must be between 2 and 50"
            : ""
        }
      />
    </div>
  );
};
