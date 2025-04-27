import React from "react";
import PropTypes from "prop-types";
import ProductEdit from "./edit";
import { generateColumns } from "@/components/app/table/generate-column";
import { useTranslation } from "react-i18next";
import { getProducts } from "@/contexts/reducer";

const ProductUpdate = ({ item, onSuccess }) => {
  return <ProductEdit items={item} onSuccess={onSuccess} />;
};

export const ProductColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "picture", label: t("table.pic") },
      { key: "productName", label: t("table.cate.name") },
      { key: "productCode", label: t("table.cate.code") },
      { key: "category.categoryName", label: t("table.cate.code") },
      { key: "price", label: t("table.cate.code") },
      { key: "discountRate", label: t("table.desc") },
      { key: "status", label: t("table.status") },
    ],
    (item, onSuccess) => <ProductUpdate item={item} onSuccess={onSuccess} />,
    "department",
    getProducts
  );
};

ProductUpdate.propTypes = {
  item: PropTypes.object,
  onSuccess: PropTypes.func,
};
