import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Plus Jakarta Sans",
    fontSize: 14,
    fontWeightRegular: 500,
  },
  palette: {
    primary: {
      main: "#ee0704",
      contrastText: "#fff",
    },
    secondary: {
      main: "#030564",
      contrastText: "#fff",
    },
  },
});
