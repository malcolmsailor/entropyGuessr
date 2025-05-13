import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { NumberOfOutcomesInput } from "./NumberOfOutcomesInput";
import { MetricSelector } from "./MetricSelector";
import { ConstraintToggles } from "./ConstraintToggles";
export const Settings = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Settings" />
      <CardContent sx={{ marginBottom: -2 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <NumberOfOutcomesInput />
          </Grid>
          <Grid size={{ xs: 5, sm: 12, md: 6 }}>
            <MetricSelector />
          </Grid>
          <Grid size={{ xs: 7, sm: 12 }}>
            <ConstraintToggles />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
