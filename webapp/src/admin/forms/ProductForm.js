import React from "react";
import { Block, FieldBlock, Button, Alert, Input } from "@cloudhub-ux/core";
import { Form, Field } from "@cloudhub-ux/core/form";
import { useMetrics } from "@cloudhub-ux/core/customhooks";
import Dialog, {
  DialogHeader,
  DialogContent,
  DialogActions,
} from "@cloudhub-ux/core/dialog";

import colors from "@cloudhub-ux/core/theme/Colors";

import useAdminAxios from "../context/useAdminAxios";
const ProductForm = (props) => {
  const { height } = useMetrics();
  const { postData, error, reset, axiosinstance } = useAdminAxios();

  const { editingRow } = props;
  const values = editingRow || {};

  const onSaveProduct = async (values, form) => {
    console.log(postData);
    const { data } = await axiosinstance().post(`/product/saveproduct`, {
      ...values,
    });

    if (data) {
      props.onSave(data);
      props.onCancelEdit();
    }
  };

  const title = values.id
    ? values.ProductName || "Edit Product"
    : "Add Product";

  return (
    <Dialog
      open={editingRow !== null}
      onClose={props.onCancelEdit}
      minHeight={height * 0.8 > 1000 ? 1000 : height - 30}
    >
      <DialogHeader onClose={props.onCancelEdit}>{`${title}`}</DialogHeader>

      <Form
        onSubmit={onSaveProduct}
        initialValues={editingRow || {}}
        render={({ handleSubmit, submitting, pristine }) => (
          <React.Fragment>
            <DialogContent>
              <Block>
                <Field
                  label="Product Name"
                  name="ProductName"
                  component={Input}
                  required
                />
                <FieldBlock row>
                  <Field
                    label="Product Code"
                    name="ProductCode"
                    component={Input}
                    required
                    flex
                  />
                  <Field
                    label="Price"
                    name="Price"
                    component={Input}
                    number
                    min={0}
                    flex
                  />
                </FieldBlock>
              </Block>
            </DialogContent>

            <DialogActions>
              <Block>
                {Boolean(error) && (
                  <Alert error message={error} onClose={() => reset()} />
                )}
              </Block>
              <Button
                contained
                color={colors.danger}
                onClick={props.onCancelEdit}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                contained
                color={colors.success}
                onClick={handleSubmit}
                disabled={submitting || pristine}
              >
                {submitting ? "Please wait..." : "Save"}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      />
    </Dialog>
  );
};

ProductForm.defaultProps = {
  onSave: () => {},
};

export default ProductForm;
