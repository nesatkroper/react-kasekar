import React from "react";
import PropTypes from "prop-types";
import CustomerEdit from "./edit";
import { getCustomers } from "@/contexts/reducer/customer-slice";
import { useTranslation } from "react-i18next";
import { generateColumns } from "@/components/app/table/generate-column";

const CustomerEditWrapper = ({ item, onSuccess }) => {
  return <CustomerEdit items={item} onSuccess={onSuccess} />;
};

export const CustomerColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "picture", label: t("table.pic") },
      { key: "fullName", label: t("table.name") },
      { key: "gender", label: t("table.gen") },
      { key: "email", label: t("table.email") },
      { key: "phone", label: t("table.tel") },
      { key: "address", label: t("table.address") },
      { key: "status", label: t("table.status") },
    ],
    (item, onSuccess) => (
      <CustomerEditWrapper item={item} onSuccess={onSuccess} />
    ),
    "customer",
    getCustomers
  );
};

CustomerEditWrapper.propTypes = {
  item: PropTypes.object,
  onSuccess: PropTypes.func,
};
