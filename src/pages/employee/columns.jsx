import React from "react";
import EmployeeEdit from "./edit";
import PropTypes from "prop-types";
import { generateColumns } from "@/components/app/table";
import { getEmployees } from "@/contexts/reducer/employee-slice";
import { useTranslation } from "react-i18next";

const EmployeeEditWrapper = ({ item, onSuccess }) => {
  return <EmployeeEdit items={item} onSuccess={onSuccess} />;
};

export const EmployeeColumns = () => {
  const [t] = useTranslation("admin");
  return generateColumns(
    [
      { key: "info.picture", label: t("table.pic") },
      { key: "fullName", label: t("table.emp.name") },
      { key: "employeeCode", label: t("table.emp.code") },
      { key: "position.positionName", label: t("table.pos.name") },
      { key: "gender", label: t("table.gen") },
      { key: "dob", label: t("table.dob") },
      { key: "phone", label: t("table.tel") },
      { key: "salary", label: t("table.emp.salary") },
      { key: "status", label: t("table.status") },
    ],
    (item, onSuccess) => (
      <EmployeeEditWrapper item={item} onSuccess={onSuccess} />
    ),
    "employee",
    getEmployees
  );
};

EmployeeEditWrapper.propTypes = {
  item: PropTypes.object,
  onSuccess: PropTypes.func,
};
