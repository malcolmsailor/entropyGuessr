import { GuessDisplay } from "./GuessDisplay";
import { Grid, useTheme, useMediaQuery } from "@mui/material";
import { AnswerCard } from "./AnswerCard";
import { Settings } from "./Settings";
import { Header } from "./Header";

interface EntropyGameProps {
  className?: string;
}

export const EntropyGame = ({ className }: EntropyGameProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      spacing={isXs ? 1 : isMd ? 1.5 : 2}
      className={className}
      // sx={{ height: "100%" }}
    >
      <Grid size={12}>
        <Header />
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Settings />
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <AnswerCard />
      </Grid>
      <Grid size={12} sx={{ height: "100%" }}>
        <GuessDisplay />
      </Grid>
    </Grid>
  );
};
