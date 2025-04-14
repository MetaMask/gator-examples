"use client";

import { usePermissions } from "@/providers/PermissionProvider";
import { Trash2 } from "lucide-react";
import { formatEther } from "viem";

export default function PermissionInfo() {
  const { permission, removePermission } = usePermissions();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const formatPermissionType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!permission) {
    return null;
  }

  return (
    <div className="w-full mx-auto p-3 max-w-4xl space-y-2">
      <div className="bg-gray-800 w-full rounded-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Granted Permission</h3>
          <button
            onClick={removePermission}
            className="text-red-400 hover:text-red-300 text-xs"
            title="Clear permissions"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">
              {formatPermissionType(permission.permission.type)}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Expiry:</p>
                <p className="text-white">{formatDate(permission.expiry)}</p>
              </div>
              <div>
                <p className="text-gray-400">Start:</p>
                <p className="text-white">
                  {formatDate(permission.permission.data.startTime as number)}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Chain:</p>
                <p className="text-white">{permission.chainId}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-gray-400 mb-1">Permission Data:</p>
              <pre className="bg-gray-900 p-3 rounded text-xs max-h-80 text-gray-300 overflow-x-auto">
                {JSON.stringify(formatPermissionData(permission), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatPermissionData(
  data: Record<string, unknown>
): Record<string, unknown> {
  if (!data) return data;

  if (typeof data === "object") {
    const formattedData: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      if (
        typeof value === "string" &&
        (value.startsWith("0x") || /^[0-9a-fA-F]+$/.test(value))
      ) {
        if (value.length > 10) {
          try {
            formattedData[key] = formatEther(BigInt(value));
          } catch {
            formattedData[key] = parseInt(value, 16).toString();
          }
        } else {
          formattedData[key] = parseInt(value, 16).toString();
        }
      } else if (typeof value === "object" && value !== null) {
        formattedData[key] = formatPermissionData(
          value as Record<string, unknown>
        );
      } else {
        formattedData[key] = value;
      }
    }

    return formattedData;
  }

  return data;
}

