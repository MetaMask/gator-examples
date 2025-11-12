"use client";

import { usePermissions } from "@/providers/PermissionProvider";
import { Trash2 } from "lucide-react";

export default function PermissionInfo() {
  const { permission, removePermission } = usePermissions();

  if (!permission) {
    return null;
  }

  return (
    <div className="w-full mx-auto p-3 max-w-4xl space-y-2">
      <div className="bg-gray-50 dark:bg-gray-900 w-full rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Granted Permission
          </h3>
          <button
            onClick={removePermission}
            className="text-red-500 hover:text-red-400 text-xs"
            title="Clear Permissions"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          <pre className="bg-gray-200 dark:bg-gray-900 p-3 rounded text-xs max-h-80 text-gray-800 dark:text-gray-300 overflow-x-auto border border-gray-300 dark:border-gray-600">
            {JSON.stringify(permission, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}