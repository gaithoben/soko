import React from "react";
import { Block } from "@cloudhub-ux/core";
import { Router } from "@cloudhub-ux/core/reach";
import HomePage from "./HomePage";

const WebsiteRoutes = (props) => {
  const [] = React.useState(0);

  return (
    <Router style={{ flex: 1 }}>
      <HomePage path="/" default />
    </Router>
  );
};

export default WebsiteRoutes;
