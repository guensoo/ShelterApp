// index.js 또는 main.js
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ShelterFilterProvider } from "./context/ShelterFilterContext";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ShelterFilterProvider>
      <AuthProvider>
        <AlertProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </AlertProvider>
      </AuthProvider>
  </ShelterFilterProvider>
);
