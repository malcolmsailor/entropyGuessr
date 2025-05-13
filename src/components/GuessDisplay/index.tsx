import { CardContent, Card, Grid } from "@mui/material";
import { GuessChart } from "./RechartsAttempt";

import { ResultsCard } from "./ResultsCard";
export const GuessDisplay = () => {
  // const containerRef = useRef(null);
  // const [width, setWidth] = useState(1200);
  // const [height, setHeight] = useState(400);

  // useEffect(() => {
  //   if (!containerRef.current) return;

  //   const resizeObserver = new ResizeObserver((entries) => {
  //     console.log(entries[0].contentRect.width);
  //     console.log(entries[0].contentRect.height);
  //     setWidth(entries[0].contentRect.width);
  //     setHeight(entries[0].contentRect.height);
  //   });

  //   resizeObserver.observe(containerRef.current);
  //   return () => resizeObserver.disconnect();
  // }, []);
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
