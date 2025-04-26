import React from "react";
import PropTypes from "prop-types";
import ProductEdit from "./product-edit";
import { generateColumns } from "@/components/app/table/generate-column";
import { useTranslation } from "react-i18next";
import { getProducts } from "@/contexts/reducer";

const ProductUpdate = ({ item }) => {
  return <ProductEdit items={item} />;
};

export const ProductColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "picture", label: t("table.pic") },
      { key: "productName", label: t("table.cate.name") },
      { key: "productCode", label: t("table.cate.code") },
      { key: "memo", label: t("table.desc") },
      { key: "status", label: t("table.status") },
    ],
    (item) => <ProductUpdate item={item} />,
    "department",
    getProducts
  );
};

ProductUpdate.propTypes = {
  item: PropTypes.object,
};
