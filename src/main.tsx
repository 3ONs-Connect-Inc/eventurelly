import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import Spinner from "./components/Spinner.tsx";
import { ErrorBoundary } from "./pages/ErrorBoundary.tsx";

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <ThemeProvider>
            <BrowserRouter>
              <ErrorBoundary>  
                <Suspense fallback={<Spinner />}>
                  <App />
                </Suspense>
              </ErrorBoundary>
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
