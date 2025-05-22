import {
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Collapse,
  IconButton,
} from "@mui/material";
import { NumberOfOutcomesInput } from "./NumberOfOutcomesInput";
import { MetricSelector } from "./MetricSelector";
import { ConstraintToggles } from "./ConstraintToggles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useEffect, useState } from "react";

export const Settings = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [settingsOpen, setSettingsOpen] = useState(!isXs);

  useEffect(() => {
    setSettingsOpen(!isXs);
  }, [isXs]);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ marginBottom: -2 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 6, sm: 12, md: 12 }}>
            <Typography variant="h6" sx={{ marginBottom: isXs ? 0 : 1 }}>
              Settings{" "}
              {isXs && (
                <IconButton onClick={() => setSettingsOpen(!settingsOpen)}>
                  {settingsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              )}
            </Typography>
          </Grid>
          {isXs && settingsOpen && (
            <Grid size={6}>
              <NumberOfOutcomesInput />
            </Grid>
          )}
        </Grid>
        <Collapse in={settingsOpen}>
          <Grid container spacing={1}>
            {!isXs && (
              <Grid size={{ sm: 12, md: 6 }}>
                <NumberOfOutcomesInput />
              </Grid>
            )}
            <Grid size={{ xs: 5, sm: 12, md: 6 }}>
              <MetricSelector />
            </Grid>
            <Grid size={{ xs: 7, sm: 12 }} sx={{ marginTop: isXs ? 2 : 0 }}>
              <ConstraintToggles />
            </Grid>
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
};
