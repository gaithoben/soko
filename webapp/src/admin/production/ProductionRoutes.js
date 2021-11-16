import React from "react";
import { Router } from "@cloudhub-ux/core/reach";
import Product from "./Product";
import Produce from "./Produce";

const ProductionRoutes = (props) => {
  const [] = React.useState(0);

  return (
    <Router style={{ flex: 1, display: "flex" }}>
      <Produce path="/" default />
      <Produce path="rawmaterials" />
      <Product path="products" />
    </Router>
  );
};

export default ProductionRoutes;
