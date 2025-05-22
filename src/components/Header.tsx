import {
  CardContent,
  Typography,
  Card,
  Grid,
  Link,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import githubMark from "../assets/github-mark-white.svg";
export const Header = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Card
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={isXs ? 1 : 2}
          sx={{ marginTop: isXs ? -0.5 : 0, marginBottom: isXs ? -1.5 : 0 }}
        >
          <Grid
            size={1}
            sx={{
              display: "flex",
              alignItems: "center",
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
                fontSize: isXs ? "0.875rem" : "1rem",
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
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="https://github.com/malcolmsailor/entropyGuessr">
              <Tooltip title="GitHub">
                <img
                  src={githubMark}
                  alt="GitHub"
                  style={{
                    width: isXs ? "24px" : "32px",
                    height: isXs ? "24px" : "32px",
                  }}
                />
              </Tooltip>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
