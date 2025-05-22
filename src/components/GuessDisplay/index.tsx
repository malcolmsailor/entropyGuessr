import { Grid, useTheme, useMediaQuery, Box } from "@mui/material";
import { GuessChart } from "./GuessChart";

import { ResultsCard } from "./ResultsCard";

export const GuessDisplay = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
      }}
    >
      <Grid container spacing={isXs ? 1 : 2}>
        <Grid size={{ xs: 3, sm: 3 }}>
          <ResultsCard />
        </Grid>
        <Grid size={{ xs: 9, sm: 9 }}>
          <GuessChart />
        </Grid>
      </Grid>
    </Box>
  );
};
