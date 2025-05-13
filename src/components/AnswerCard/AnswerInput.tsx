import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

import { TextField } from "@mui/material";

import { FormControl } from "@mui/material";

export const AnswerInput = () => {
  const { answer, setAnswer } = useContext(GameContext);

  const validateRawAnswer = () => {
    if (answer.trim() === "") {
      return true;
    }
    const bits = answer.trim().split(/\s+/);
    for (const bit of bits) {
      if (!bit.match(/^-?\d+\.?\d*$|^-?\.\d*$/)) {
        return false;
      }
    }
    return true;
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <TextField
        label="E.g., '0.5 0.3 0.2'"
        variant="outlined"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        error={!validateRawAnswer()}
        helperText={!validateRawAnswer() ? "Enter space-separated numbers" : ""}
      />
    </FormControl>
  );
};
