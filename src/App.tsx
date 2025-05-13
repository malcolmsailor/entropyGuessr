import { GameContextProvider } from "./context/GameContext";
import { EntropyGame } from "./components/EntropyGame";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameContextProvider>
        <Container maxWidth="md">
          {/* To test how it will look within a fixed width container like on my 
              Jekyll site, replace above Container declaration with the following: */}
          {/* <Container maxWidth={false} sx={{ maxWidth: "600px" }}> */}
          <EntropyGame />
        </Container>
      </GameContextProvider>
    </ThemeProvider>
  );
}

export default App;
