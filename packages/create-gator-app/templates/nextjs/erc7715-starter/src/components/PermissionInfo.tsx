"use client";

import { usePermissions } from "@/providers/PermissionProvider";
import { Trash2 } from "lucide-react";
import { formatEther, maxUint256 } from "viem";

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
      <div className="bg-gray-50 dark:bg-gray-900 w-full rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Granted Permission
          </h3>
          <button
            onClick={removePermission}
            className="text-red-500 hover:text-red-400 text-xs"
            title="Clear permissions"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {formatPermissionType(permission.permission.type)}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Expiry:</p>
                <p className="text-gray-900 dark:text-white">
                  {formatDate(permission.expiry)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Start:</p>
                <p className="text-gray-900 dark:text-white">
                  {formatDate(permission.permission.data.startTime as number)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Chain:</p>
                <p className="text-gray-900 dark:text-white">
                  {permission.chainId}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Permission Data: (formatted)
              </p>
              <pre className="bg-gray-200 dark:bg-gray-900 p-3 rounded text-xs max-h-80 text-gray-800 dark:text-gray-300 overflow-x-auto border border-gray-300 dark:border-gray-600">
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
  data: Record<string, unknown>,
): Record<string, unknown> {
  if (!data) return data;

  if (typeof data === 'object') {
    const formattedData: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      if (['initialAmount', 'amountPerSecond', 'maxAmount'].includes(key)) {
        // format as ether
        const valueBigInt = BigInt(value as string);

        if (valueBigInt === maxUint256) {
          formattedData[key] = 'Unlimited';
        } else {
          try {
            formattedData[key] = formatEther(valueBigInt);
          } catch {
            formattedData[key] = valueBigInt.toString();
          }
        }
      } else if (Array.isArray(value)) {
        formattedData[key] = value.map((item) => {
          return formatPermissionData(item as Record<string, unknown>);
        });
      } else if (typeof value === 'object' && value !== null) {
        formattedData[key] = formatPermissionData(
          value as Record<string, unknown>,
        );
      } else {
        formattedData[key] = value;
      }
    }

    return formattedData;
  }

  return data;
}
