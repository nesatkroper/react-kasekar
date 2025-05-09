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


// "use client"

// import { useAuth } from "@/providers/auth-provider"
// import { ROLE_HIERARCHY, ROLES } from "@/constants/role"

// export const useRoles = () => {
//   const { user } = useAuth()

//   // Get the user's role from the auth context
//   const userRole = user?.role || ROLES.CLIENT // Default to lowest role if not set

//   // Check if user has a specific role
//   const hasRole = (role: string) => {
//     return userRole === role
//   }

//   // Check if user has the exact role or a higher role in the hierarchy
//   const hasHigherOrEqualRole = (minimumRole: string) => {
//     // If the role doesn't exist in the hierarchy, deny access
//     if (!ROLE_HIERARCHY[userRole] || !ROLE_HIERARCHY[minimumRole]) {
//       return false
//     }

//     // Compare the user's role level with the minimum required role level
//     return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole]
//   }

//   return {
//     userRole,
//     hasRole,
//     hasHigherOrEqualRole,
//   }
// }