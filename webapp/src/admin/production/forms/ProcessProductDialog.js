import React from "react";
import {
  Dialog,
  Text,
  Input,
  FieldBlock,
  toastr,
  Button,
} from "@cloudhub-ux/core";
import { Form, Field } from "@cloudhub-ux/core/form";
import DialogHeader from "@cloudhub-ux/core/dialog/DialogHeader";
import DialogContent from "@cloudhub-ux/core/dialog/DialogContent";
import DialogActions from "@cloudhub-ux/core/dialog/DialogActions";
import { colors } from "../../../theme";
import useAdminAxios from "../../context/useAdminAxios";
import Block from "@cloudhub-ux/core/Block";
import ProductSelector from "../selectors/ProductSelector";

const ProcessProductDialog = ({
  open,
  onClose,
  onSave = () => null,
  ...props
}) => {
  const { postData } = useAdminAxios();

  const onSubmit = async (values) => {
    const data = await postData({
      url: "/admin/production/produce/processproduct",
      params: {
        ...values,
      },
    });

    if (data) {
      toastr.success("Processing successfull");
      onClose();
    }
  };

  return (
    <Dialog open={open} maxHeight={500} onClose={onClose}>
      <DialogHeader>
        <Text header>Process Product</Text>
      </DialogHeader>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => {
          return (
            <React.Fragment>
              <DialogContent>
                <Block>
                  <Field
                    label="Product"
                    name="Product"
                    component={ProductSelector}
                    required
                  />
                  <Field
                    label="Packs"
                    name="Packs"
                    component={Input}
                    number
                    min={0}
                  />
                </Block>
              </DialogContent>

              <DialogActions>
                <Button contained color={colors.danger} onClick={onClose}>
                  <Text white>Cancel</Text>
                </Button>

                <Button contained color={colors.success} onClick={handleSubmit}>
                  <Text white>Save</Text>
                </Button>
              </DialogActions>
            </React.Fragment>
          );
        }}
      />
    </Dialog>
  );
};

export default ProcessProductDialog;
