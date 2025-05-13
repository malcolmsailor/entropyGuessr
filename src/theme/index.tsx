import { createTheme, responsiveFontSizes } from "@mui/material";

interface SpacingSpec {
  [key: string]: number;
}

declare module "@mui/material/styles" {
  interface Theme {
    customValues: {
      guessScatterMargins: SpacingSpec;
    };
    customColors: {
      target: string;
      errorColor: string;
      max?: string;
      min?: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    customValues: {
      guessScatterMargins: SpacingSpec;
    };
    customColors: {
      target: string;
      errorColor: string;
      max?: string;
      min?: string;
    };
  }
}

export const applySpacing = (obj: SpacingSpec, spacing: string) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value * parseInt(spacing)])
  );
};

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
    },
    typography: {
      fontSize: 12,
    },
    components: {
      MuiCardHeader: {
        styleOverrides: {
          root: { marginBottom: 0, paddingBottom: 0 },
        },
      },
    },
    customValues: {
      guessScatterMargins: {
        left: 2,
        right: 2,
        top: 2,
        bottom: 3,
      },
    },
    customColors: {
      target: "#8884d8",
      errorColor: "#FF5733",
    },
  })
);

theme.customColors.max = theme.palette.grey[500];
theme.customColors.min = theme.palette.grey[500];
