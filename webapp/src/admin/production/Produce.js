/* eslint-disable capitalized-comments */
import React from "react";

import { RemoteDataGrid } from "@cloudhub-ux/core/datagrid";

import { Block, Alert, Text, Input, Button } from "@cloudhub-ux/core";

import useAdminAxios from "../context/useAdminAxios";
import CellComponent from "../common/CellComponent";

import ProduceForm from "./forms/ProduceForm";

import { Refresh, Print, Add, GetApp } from "@mui/icons-material";
import { sizes, colors } from "../../theme";
import ProcessProductDialog from "./forms/ProcessProductDialog";

// const dateFormat = 'DD-MMM-YYYY hh:mm a';

const Produce = (props) => {
  const { getData, axiosinstance, error, reset: setError } = useAdminAxios();
  const gridRef = React.useRef();
  const [editingRow, setEditingRow] = React.useState(null);
  const [showProcess, setShowProcess] = React.useState(false);

  const deleteRows = async (deletingRows) => {
    const ids = deletingRows.map((item) => item.id);
    getData({ url: "/admin/production/produce/delete", params: { ids } });
    gridRef.current.onDeleteSuccess(deletingRows);
  };

  const headerTemplate = ({
    onRefresh,
    onPrint,
    onSearch,
    onAdd,
    onSort,
    allowadd,
    allowprint,
    classes,
  }) => (
    <Block flex={false} paper margin={sizes.margin}>
      <Block padding={sizes.padding} row>
        <Block>
          <Text h5>Raw Nuts</Text>
        </Block>
        <Block flex={false} row middle>
          <Input
            style={{ flex: 1, minWidth: 200 }}
            icon="search"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            showError={false}
          />

          <Button
            contained
            className={classes.headerButton}
            onClick={() => setShowProcess(true)}
          >
            <GetApp /> Process Product
          </Button>
          <Button className={classes.headerButton} onClick={onAdd}>
            <Add /> Add
          </Button>
          <Button className={classes.headerButton} onClick={onRefresh}>
            <Refresh /> Refresh
          </Button>
          <Button
            className={classes.headerButton}
            onClick={onPrint}
            disabled={!allowprint}
          >
            <Print /> Print
          </Button>
        </Block>
      </Block>
      <Block className={classes.filterBar}>
        <Block />
      </Block>
    </Block>
  );

  const cols = [
    { name: "ProductCode", title: "Product Code" },
    { name: "ProductName", title: "Product Name" },
    { name: "Weight" },
  ];

  const columnWidths = [
    { columnName: "ProductCode", width: 120 },
    { columnName: "ProductName", width: 150 },
    { columnName: "Weight", width: 150 },
  ];

  return (
    <Block>
      <Block flex={false}>
        {Boolean(error) && (
          <Alert error message={error} onClose={() => setError("")} />
        )}
      </Block>
      <RemoteDataGrid
        title="Raw Materials"
        url="/admin/production/produce/getall"
        axiosinstance={axiosinstance}
        columns={cols}
        columnWidths={columnWidths}
        allowColumnResizing={false}
        cellComponent={CellComponent}
        header={headerTemplate}
        onAdd={() => setEditingRow({})}
        onDeleteRows={deleteRows}
        onEdit={(row) => setEditingRow(row)}
        ref={gridRef}
      />
      {editingRow && (
        <ProduceForm
          editingRow={editingRow}
          onCancelEdit={() => setEditingRow(null)}
          onSave={(row) => gridRef.current.onSave(row)}
        />
      )}
      {showProcess && (
        <ProcessProductDialog
          open={showProcess}
          onClose={() => setShowProcess(false)}
        />
      )}
    </Block>
  );
};

export default Produce;
