import React from "react";
import { Block, Button, Text } from "@cloudhub-ux/core";
import { sizes } from "../theme";
import { Link } from "@cloudhub-ux/core/reach";

const WebsiteApp = (props) => {
  const [] = React.useState(0);

  return (
    <Block>
      <Block
        flex={false}
        color="gray4"
        padding={sizes.padding}
        style={{ height: 80 }}
      >
        <Button component={Link} to="/admin" contained style={{ width: 100 }}>
          Admin
        </Button>
      </Block>
    </Block>
  );
};

export default WebsiteApp;
