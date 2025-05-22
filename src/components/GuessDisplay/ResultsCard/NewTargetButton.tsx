import { Button } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import { generateNewTarget } from "../../../logic/game/generateNewTarget";
import { alpha } from "@mui/material/styles";

export const NewTargetButton = () => {
  const { setGuesses, setTarget, settings } = useContext(GameContext);

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setTarget(generateNewTarget(settings.numOutcomes));
        setGuesses({});
      }}
      sx={{
        bgcolor: (theme) => theme.palette.primary.contrastText,
        color: (theme) => theme.palette.primary.main,
        "&:hover": {
          bgcolor: (theme) => alpha(theme.palette.primary.contrastText, 0.93),
        },
        boxShadow: (theme) =>
          `0px 3px 5px ${alpha(theme.palette.common.black, 0.2)}`,
        width: "100%",
        fontSize: { xs: "0.625rem", sm: "0.75rem", md: "0.875rem" },
      }}
    >
      Generate New Target
    </Button>
  );
};
