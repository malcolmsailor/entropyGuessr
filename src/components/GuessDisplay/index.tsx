import { Grid } from "@mui/material";
import { GuessChart } from "./GuessChart";

import { ResultsCard } from "./ResultsCard";

export const GuessDisplay = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 3, sm: 3 }}>
        <ResultsCard />
      </Grid>
      <Grid size={{ xs: 9, sm: 9 }}>
        <GuessChart />
      </Grid>
    </Grid>
  );
};
