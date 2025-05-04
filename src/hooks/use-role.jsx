import { ROLES, ROLE_HIERARCHY } from "@/constants/role";
import { getAuthData } from "@/providers/user-provider";

export const useRoles = () => {
  const user = getAuthData();
  const hasRole = (role) => {
    return user?.role?.name === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role?.name);
  };

  const hasHigherOrEqualRole = (minRole) => {
    if (!user?.role?.name) return false;
    return ROLE_HIERARCHY[user.role?.name] >= ROLE_HIERARCHY[minRole];
  };

  return {
    hasRole,
    hasAnyRole,
    hasHigherOrEqualRole,
    currentRole: user?.role?.name,
    ROLES,
  };
};
