import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import reduxStore from "./reduxStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Define any custom theme overrides if needed
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <ChakraProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
