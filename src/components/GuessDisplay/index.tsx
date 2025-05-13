import { Grid } from "@mui/material";
import { GuessChart } from "./GuessChart";

import { ResultsCard } from "./ResultsCard";

export const GuessDisplay = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 3, md: 2 }}>
        <ResultsCard />
      </Grid>
      <Grid size={{ xs: 12, sm: 9, md: 10 }}>
        <GuessChart />
      </Grid>
    </Grid>
  );
};
