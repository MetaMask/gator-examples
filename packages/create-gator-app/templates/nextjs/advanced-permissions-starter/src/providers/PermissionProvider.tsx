"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";
import { RequestExecutionPermissionsReturnType } from "@metamask/smart-accounts-kit/actions";

export type Permission = NonNullable<RequestExecutionPermissionsReturnType>[number];

interface PermissionContextType {
  permission: Permission | null;
  savePermission: (permission: Permission) => void;
  fetchPermission: () => Permission | null;
  removePermission: () => void;
}

export const PermissionContext = createContext<PermissionContextType>({
  permission: null,
  savePermission: () => { },
  fetchPermission: () => null,
  removePermission: () => { },
});

export const PermissionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [permission, setPermission] = useState<Permission | null>(null);

  // Saves the permission to state only. This is for demonstration purposes.
  // For production, where you need to access the permission on
  // backend, you should store it in a database.
  const savePermission = (permisison: Permission) => {
    setPermission(permisison);
  };

  // Fetches the permission from state
  const fetchPermission = () => {
    return permission;
  };

  // Removes the permission from state
  const removePermission = () => {
    setPermission(null);
  };

  return (
    <PermissionContext.Provider
      value={{
        permission,
        savePermission,
        fetchPermission,
        removePermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  return useContext(PermissionContext);
};