// index.js 또는 main.js
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom/client";
import App from "./App";

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById("root")).render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
);
