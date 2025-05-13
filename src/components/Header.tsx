import { CardContent, Typography, Card, Grid, Link } from "@mui/material";

export const Header = () => {
  return (
    <Card>
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
            {/* TODO: update link to point to the about page */}
            <Link
              href="https://malcolmsailor.com"
              color="inherit"
              underline="hover"
            >
              About
            </Link>
          </Grid>
          <Grid size={10}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              EntropyGuessr
            </Typography>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Guess a distribution with the target entropy.
            </Typography>
          </Grid>
          <Grid
            size={1}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {/* TODO: update link to point to the repo */}
            <a href="https://github.com/malcolmsailor">
              <img
                src="assets/github-mark.svg"
                alt="GitHub"
                style={{ width: "32px", height: "32px" }}
              />
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
