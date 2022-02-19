import Menu from "./components/Main/Main";
import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
function App() {
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: "dark",
      },
    })
  );
  return (
    <ThemeProvider theme={theme}>
      <Menu></Menu>{" "}
    </ThemeProvider>
  );
}

export default App;
