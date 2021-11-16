import ThemeProvider from "@cloudhub-ux/core/theme/ThemeProvider";
import LocationProvider from "@cloudhub-ux/core/customhooks/LocationProvider";
import AdminApp from "./admin/AdminApp";
import "./App.css";
import { Router } from "@cloudhub-ux/core/reach";
import AdminRoutes from "./admin/AdminRoutes";
import WebsiteRoutes from "./website/WebsiteRoutes";
import WebsiteApp from "./website/WebsiteApp";

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
      <WebsiteApp path="/" default />
      <AdminApp path="/admin/*" />
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
