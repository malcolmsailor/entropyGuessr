import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

import { TextField } from "@mui/material";

import { FormControl } from "@mui/material";

export const AnswerInput = () => {
  const { answer, setAnswer } = useContext(GameContext);

  // const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setAnswer(value);
  //   // TODO: (Malcolm 2025-05-06) we don't want to do the full validation here,
  //   // but maybe we should do a partial validation here
  //   // if (validateAnswer(value)) {
  //   //   setError(false);
  //   // } else {
  //   //   setError(true);
  //   // }
  // };

  const validateRawAnswer = () => {
    if (answer.trim() === "") {
      return true;
    }
    const bits = answer.trim().split(/\s+/);
    for (const bit of bits) {
      if (!bit.match(/^-?\d+\.?\d*$/)) {
        return false;
      }
    }
    return true;
  };
  return (
    <FormControl>
      {/* <Tooltip title="There must be N non-negative values"> */}
      {/* <FormLabel>Enter your distribution (space-separated numbers)</FormLabel> */}

      <TextField
        label="E.g., '0.5 0.3 0.2'"
        variant="outlined"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        error={!validateRawAnswer()}
        helperText={!validateRawAnswer() ? "Enter space-separated numbers" : ""}
      />
      {/* </Tooltip> */}
    </FormControl>
  );
};
