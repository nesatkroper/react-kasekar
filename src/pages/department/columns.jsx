import React from "react";
import DepartmentEdit from "./edit";
import PropTypes from "prop-types";
import { generateColumns } from "@/components/app/table/generate-column";
import { getDepartments } from "@/contexts/reducer/department-slice";
import { useTranslation } from "react-i18next";

const EditWrapper = ({ item, onSuccess }) => {
  return <DepartmentEdit items={item} onSuccess={onSuccess} />;
};

export const DepartmentColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "departmentName", label: t("table.dep.name") },
      { key: "departmentCode", label: t("table.dep.code") },
      { key: "memo", label: t("table.desc") },
      { key: "status", label: t("table.status") },
    ],
    (item, onSuccess) => <EditWrapper item={item} onSuccess={onSuccess} />,
    "department",
    getDepartments
  );
};

EditWrapper.propTypes = {
  item: PropTypes.object,
  onSuccess: PropTypes.func,
};
