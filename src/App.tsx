import { GameContextProvider } from "./context/GameContext";
import { EntropyGame } from "./components/EntropyGame";
import Container from "@mui/material/Container";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";

const ThemeViewer = () => {
  const theme = useTheme();
  return (
    <div>
      {Object.entries(theme.palette).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return (
            <div key={key}>
              <h3>{key}</h3>
              {Object.entries(value).map(([subKey, color]) => {
                if (typeof color === "string") {
                  return (
                    <div
                      key={`${key}-${subKey}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "5px 0",
                      }}
                    >
                      <div
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: color,
                          marginRight: 10,
                        }}
                      />
                      <span>{`${key}.${subKey}: ${color}`}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

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
