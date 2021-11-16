import React from "react";
import { TableCell } from "@mui/material";

const CellComponent = ({ row, column }) => {
  const [] = React.useState(0);

  return <TableCell>{row[column.name]}</TableCell>;
};

export default CellComponent;
