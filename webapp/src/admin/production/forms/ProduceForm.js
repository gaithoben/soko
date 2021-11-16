import React from "react";
import { Block, Button, Alert, Input } from "@cloudhub-ux/core";
import { Form, Field } from "@cloudhub-ux/core/form";
import { useMetrics } from "@cloudhub-ux/core/customhooks";
import Dialog, {
  DialogHeader,
  DialogContent,
  DialogActions,
} from "@cloudhub-ux/core/dialog";

import { colors, sizes } from "../../../theme";

import useAdminAxios from "../../context/useAdminAxios";

const ProduceForm = (props) => {
  const { height } = useMetrics();
  const { postData, error, reset } = useAdminAxios();

  const { editingRow } = props;
  const values = editingRow || {};

  const onSaveProduce = async (values, form) => {
    const data = await postData({
      url: `/admin/production/produce/saveproduce`,
      params: {
        ...values,
      },
    });

    if (data) {
      props.onSave(data);
      props.onCancelEdit();
    }
  };

  const title = values.id
    ? values.ProduceName || "Edit Produce"
    : "Add Produce";

  return (
    <Dialog
      open={editingRow !== null}
      onClose={props.onCancelEdit}
      minHeight={height * 0.8 > 1000 ? 1000 : height - 30}
    >
      <DialogHeader onClose={props.onCancelEdit}>{`${title}`}</DialogHeader>
      <Form
        onSubmit={onSaveProduce}
        initialValues={editingRow || {}}
        render={({ handleSubmit, submitting, pristine }) => (
          <React.Fragment>
            <DialogContent>
              <Block>
                <Field
                  label="Product Name"
                  name="ProductName"
                  component={Input}
                />
                <Field
                  label="Product Code"
                  name="ProductCode"
                  component={Input}
                  required
                />
                <Field
                  label="Weight"
                  name="Weight"
                  component={Input}
                  number
                  min={0}
                />
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

ProduceForm.defaultProps = {
  onSave: () => {},
};

export default ProduceForm;
