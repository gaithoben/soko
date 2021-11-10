import React from "react";
import { Router } from "@cloudhub-ux/core/reach";
import Product from "./Product";

const AdminRoutes = (props) => {
  const [] = React.useState(0);

  return (
    <Router style={{ flex: 1, display: "flex" }}>
      <Product path="/products/*" default />
    </Router>
  );
};

export default AdminRoutes;
