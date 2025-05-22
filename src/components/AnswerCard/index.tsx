import {
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AnswerInput } from "./AnswerInput";
import { AnswerBarChart } from "./AnswerBarChart";
import { CalculateButton } from "./CalculateButton";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export const AnswerCard = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const { validationErrors } = useContext(GameContext);

  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      {/* <CardHeader title="Answer" /> */}
      <CardContent
        sx={{ marginBottom: isXs ? -3 : -2, marginTop: isXs ? -1 : 0 }}
      >
        <Grid container spacing={isMd ? 1 : 2}>
          <Grid
            size={{ xs: 3, sm: 12 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Answer</Typography>
          </Grid>
          <Grid size={{ xs: 9, sm: 12 }}>
            <AnswerInput />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CalculateButton />
            {validationErrors && (
              <>
                {validationErrors.map((error) => (
                  <Typography key={error} color="error">
                    {error}
                  </Typography>
                ))}
              </>
            )}
          </Grid>
          <AnswerBarChart gridSize={{ xs: 6 }} />
        </Grid>
      </CardContent>
    </Card>
  );
};
