import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "System-UI",
    fontSize: 14,
    fontWeightRegular: 500,
  },
  palette: {
    // mode: 'light',
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
