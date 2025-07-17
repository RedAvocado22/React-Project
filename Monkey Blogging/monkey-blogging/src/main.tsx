import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { theme } from "./utils/constants.ts";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles></GlobalStyles>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
