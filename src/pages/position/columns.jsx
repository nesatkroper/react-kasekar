import PositionUpdate from "./edit";
import React from "react";
import PropTypes from "prop-types";
import { generateColumns } from "@/components/app/table/generate-column";
import { getPositions } from "@/contexts/reducer/position-slice";
import { useTranslation } from "react-i18next";

const PositionEditWrapper = ({ item, onSuccess }) => {
  return <PositionUpdate items={item} onSuccess={onSuccess} />;
};

export const PositionColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "positionName", label: t("table.pos.name") },
      { key: "positionCode", label: t("table.pos.code") },
      { key: "department.departmentName", label: t("table.dep.name") },
      { key: "memo", label: t("table.status") },
      { key: "status", label: t("table.status") },
    ],
    (item, onSuccess) => (
      <PositionEditWrapper item={item} onSuccess={onSuccess} />
    ),
    "position",
    getPositions
  );
};

PositionEditWrapper.propTypes = {
  item: PropTypes.object,
  onSuccess: PropTypes.func,
};
