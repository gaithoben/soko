import ThemeProvider from "@cloudhub-ux/core/theme/ThemeProvider";
import LocationProvider from "@cloudhub-ux/core/customhooks/LocationProvider";
import AdminApp from "./admin/AdminApp";
import "./App.css";
import { Router } from "@cloudhub-ux/core/reach";

const HomeRouter = () => {
  return (
    <Router
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AdminApp path="/adminpp" default />
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <HomeRouter />
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;
