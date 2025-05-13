import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { AnswerInput } from "./AnswerInput";
import { AnswerBarChart } from "./AnswerBarChart";
import { CalculateButton } from "./CalculateButton";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export const AnswerCard = () => {
  const { validationErrors } = useContext(GameContext);

  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardHeader title="Answer" />
      <CardContent sx={{ marginBottom: -2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
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
