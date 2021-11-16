import React from "react";
import { Router } from "@cloudhub-ux/core/reach";
import ProductionRoutes from "./production/ProductionRoutes";
import MainDashboard from "./dashboards/MainDashboard";

const AdminRoutes = (props) => {
  const [] = React.useState(0);

  return (
    <Router style={{ flex: 1, display: "flex" }}>
      <MainDashboard path="/" default />
      <ProductionRoutes path="production/*" />
    </Router>
  );
};

export default AdminRoutes;
