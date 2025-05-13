import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
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
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={1} direction="column">
              <AnswerInput />
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
            </Stack>
          </Grid>
          <AnswerBarChart gridSize={{ xs: 12, sm: 6 }} />
        </Grid>
      </CardContent>
    </Card>
  );
};
