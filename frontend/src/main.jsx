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
import { GoogleOAuthProvider } from "@react-oauth/google";

const theme = createTheme({
  // Define any custom theme overrides if needed
});

const CLIENT_ID =
  "459500879068-l4tgvoss4dtg9j2i0877s2998do9g19i.apps.googleusercontent.com"; // Thay bằng Client ID từ Google Cloud Console

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <ChakraProvider>
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </GoogleOAuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
