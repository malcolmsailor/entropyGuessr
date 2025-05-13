import {
  CardContent,
  Typography,
  Card,
  Grid,
  Link,
  Tooltip,
} from "@mui/material";
import githubMark from "../assets/github-mark-white.svg";
export const Header = () => {
  return (
    <Card
      sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            size={1}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Link
              href="https://malcolmsailor.com/2025/05/13/entropy-guessr.html"
              color="inherit"
              underline="hover"
              sx={{
                "&:visited": { color: "inherit" },
                "&:hover": { color: "inherit" },
              }}
            >
              About
            </Link>
          </Grid>
          <Grid size={10}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              EntropyGuessr
            </Typography>
            {/* <Typography variant="h5" sx={{ textAlign: "center" }}>
              Your goal is to guess a distribution with the target entropy.
            </Typography> */}
          </Grid>
          <Grid
            size={1}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Link href="https://github.com/malcolmsailor/entropyGuessr">
              <Tooltip title="GitHub">
                <img
                  src={githubMark}
                  alt="GitHub"
                  style={{ width: "32px", height: "32px" }}
                />
              </Tooltip>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
