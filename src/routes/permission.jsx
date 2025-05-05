import React from "react";
import ForbiddenPage from "@/components/app/403";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { useRoles } from "@/hooks/use-role";

const RoleRoute = ({ requiredRole, minimumRole }) => {
  const { hasRole, hasHigherOrEqualRole } = useRoles();

  if (requiredRole && !hasRole(requiredRole)) {
    return <ForbiddenPage />;
  }

  if (minimumRole && !hasHigherOrEqualRole(minimumRole)) {
    return <ForbiddenPage />;
  }

  return <Outlet />;
};

export default RoleRoute;

RoleRoute.propTypes = {
  requiredRole: PropTypes.string,
  minimumRole: PropTypes.string,
};
