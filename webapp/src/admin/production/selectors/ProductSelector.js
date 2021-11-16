import React from "react";
import { RemoteSelector } from "@cloudhub-ux/core/selectors";
import useAdminAxios from "../../context/useAdminAxios";

const ProductSelector = (props) => {
  const { axiosinstance } = useAdminAxios();
  return (
    <RemoteSelector
      url={`admin/production/product/filtersearch`}
      axiosinstance={axiosinstance}
      keyExtractor={(item) => item.id}
      labelExtractor={(item) => item.ProductName}
      valueExtractor={(item) => ({
        _id: item._id,
        id: item.id,
        ProductName: item.ProductName,
        ProductCode: item.ProductCode,
      })}
      {...props}
    />
  );
};
ProductSelector.defaultProps = {
  meta: {},
  selectUp: false,
};

export default ProductSelector;
