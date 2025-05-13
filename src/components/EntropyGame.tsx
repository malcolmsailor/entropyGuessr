import { GuessDisplay } from "./GuessDisplay";
import { Grid } from "@mui/material";
import { AnswerCard } from "./AnswerCard";
import { Settings } from "./Settings";
import { Header } from "./Header";

interface EntropyGameProps {
  className?: string;
}

export const EntropyGame = ({ className }: EntropyGameProps) => {
  return (
    <Grid container spacing={2} className={className}>
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
