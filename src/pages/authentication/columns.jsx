import React from "react";
import PropTypes from "prop-types";
import AuthenticationEdit from "./edit";
import { generateColumns } from "@/components/app/table/generate-column";
import { useTranslation } from "react-i18next";
import { getAuth } from "@/contexts/reducer/auth-slice";

const AuthenticationEditWrapper = ({ item, onSuccess }) => {
  return <AuthenticationEdit items={item} onSuccess={onSuccess} />;
};

export const AuthenticationColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "employee.fullname", label: t("table.pos.name") },
      { key: "email", label: t("table.pos.code") },
      { key: "status", label: t("table.status") },
    ],
    (item, onSuccess) => (
      <AuthenticationEditWrapper item={item} onSuccess={onSuccess} />
    ),
    "auth",
    getAuth
  );
};

AuthenticationEditWrapper.propTypes = {
  item: PropTypes.object,
  onSuccess: PropTypes.func,
};
