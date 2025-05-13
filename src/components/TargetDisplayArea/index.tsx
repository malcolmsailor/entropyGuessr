import { Grid } from "@mui/material";
import { TargetDisplay } from "./TargetDisplay";
import { Settings } from "./Settings";

export const TargetDisplayArea = () => {
  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TargetDisplay />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Settings />
      </Grid>
    </Grid>
  );
};
