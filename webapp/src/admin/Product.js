/* eslint-disable capitalized-comments */
import React from "react";

import { RemoteDataGrid } from "@cloudhub-ux/core/datagrid";

import { Block, Alert } from "@cloudhub-ux/core";

import useAdminAxios from "./context/useAdminAxios";

import ProductForm from "./forms/ProductForm";
import { TableCell } from "@mui/material";

// const dateFormat = 'DD-MMM-YYYY hh:mm a';

const Product = (props) => {
  const {
    getData,
    axiosinstance: adminaxiosinstance,
    error,
    reset: setError,
  } = useAdminAxios();
  const gridRef = React.useRef();
  const [editingRow, setEditingRow] = React.useState(null);

  const deleteRows = async (deletingRows) => {
    const ids = deletingRows.map((item) => item.id);
    getData({ url: "/product/delete", params: { ids } });
    gridRef.current.onDeleteSuccess(deletingRows);
  };

  const cellComponent = ({ row, column }) => {
    return <TableCell>{row[column.name]}</TableCell>;
  };

  const cols = [
    { name: "ProductCode", title: "Product Code" },
    { name: "ProductName", title: "Product Name" },
  ];

  const columnWidths = [
    { columnName: "ProductCode", width: 120 },
    { columnName: "ProductName", width: 150 },
  ];

  return (
    <Block>
      <Block flex={false}>
        {Boolean(error) && (
          <Alert error message={error} onClose={() => setError("")} />
        )}
      </Block>
      <RemoteDataGrid
        title="Products"
        url="/product/getall"
        axiosinstance={adminaxiosinstance}
        columns={cols}
        columnWidths={columnWidths}
        allowColumnResizing={false}
        cellComponent={cellComponent}
        onAdd={() => setEditingRow({})}
        onDeleteRows={deleteRows}
        onEdit={(row) => setEditingRow(row)}
        ref={gridRef}
      />
      {editingRow && (
        <ProductForm
          editingRow={editingRow}
          onCancelEdit={() => setEditingRow(null)}
          onSave={(row) => gridRef.current.onSave(row)}
        />
      )}
    </Block>
  );
};

export default Product;
