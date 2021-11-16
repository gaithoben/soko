import React from "react";
import { Block, ListMenu, Text } from "@cloudhub-ux/core";
import Colors from "@cloudhub-ux/core/theme/Colors";
import { ListMenuItem } from "@cloudhub-ux/core/widgets";
import { Link } from "@cloudhub-ux/core/reach";
import AdminRoutes from "./AdminRoutes";

const AdminApp = ({ children }) => {
  const [] = React.useState(0);

  return (
    <Block style={{ height: "100%" }}>
      <Block row>
        <Block flex={false} style={{ width: 300 }} color={Colors.gray2}>
          <ListMenu>
            <ListMenuItem component={Link} to="/" primary="Website" />
            <ListMenuItem
              component={Link}
              to="production/rawmaterials"
              primary="Raw Materials"
            />
            <ListMenuItem
              component={Link}
              to="production/products"
              primary="Products"
            />
          </ListMenu>
        </Block>
        <Block>
          <AdminRoutes />
        </Block>
      </Block>
    </Block>
  );
};

export default AdminApp;
