import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Plus Jakarta Sans",
    fontSize: 13,
  },
  palette: {
    primary: {
      main: "#ee0704",
    },
    secondary: {
      main: "#030564",
      contrastText: "#fff",
    },
  },
});
