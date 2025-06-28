import ReactDOM from "react-dom/client";
import App from "./App";
import { ShelterFilterProvider } from "./context/ShelterFilterContext";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ShelterFilterProvider>
    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  </ShelterFilterProvider>
);