// import { GuessForm } from "./GuessForm";

import { GuessDisplay } from "./GuessDisplay";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { AnswerCard } from "./AnswerCard";
import { Settings } from "./TargetDisplayArea/Settings";
import { Header } from "./Header";
export const EntropyGame = ({}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Header />
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Settings />
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <AnswerCard />
      </Grid>
      <Grid size={12}>
        <GuessDisplay />
      </Grid>
    </Grid>
  );
};
