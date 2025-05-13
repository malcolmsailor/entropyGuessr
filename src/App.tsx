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
        <Container maxWidth="lg">
          <EntropyGame />
        </Container>
      </GameContextProvider>
    </ThemeProvider>
  );
}

export default App;
