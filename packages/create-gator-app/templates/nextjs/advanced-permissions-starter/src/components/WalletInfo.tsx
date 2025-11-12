"use client";

import { Address, formatEther } from "viem";
import { ExternalLink } from "lucide-react";
import { useAccount, useBalance } from "wagmi";

interface WalletInfoProps {
  address: Address;
  label: string;
}

export default function WalletInfo({ address, label }: WalletInfoProps) {
  const { data: balance, isLoading } = useBalance({ address });
  const { chain } = useAccount();

  const viewOnEtherscan = () => {
    window.open(`${chain?.blockExplorers?.default?.url}/address/${address}`, "_blank");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {label}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </p>
            <button
              onClick={viewOnEtherscan}
              className="text-blue-500 hover:text-blue-400"
              title="View on Etherscan"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            Balance: {isLoading ? "..." : `${formatEther(balance?.value ?? 0n)} ${balance?.symbol}`}
          </p>
        </div>
      </div>
    </div>
  );
}