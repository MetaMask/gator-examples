"use client";

import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { publicClient } from "@/services/publicClient";
import { Trash2, ExternalLink } from "lucide-react";
import { config } from "@/config";

interface WalletInfoProps {
  address: string;
  label: string;
  onClear?: () => void;
  showClearButton?: boolean;
}

export default function WalletInfo({
  address,
  label,
  onClear,
  showClearButton = false,
}: WalletInfoProps) {
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trimmedAddress, setTrimmedAddress] = useState<string>("");

  useEffect(() => {
    if (address) {
      setTrimmedAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [address]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) return;

      try {
        setIsLoading(true);
        const balanceWei = await publicClient.getBalance({
          address: address as `0x${string}`,
        });
        setBalance(formatEther(balanceWei));
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("0");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [address]);

  const viewOnEtherscan = () => {
    window.open(`${config.ethScanerUrl}/address/${address}`, "_blank");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {label}
            </h3>
            {showClearButton && onClear && (
              <button
                onClick={onClear}
                className="text-red-500 hover:text-red-400 text-xs"
                title="Clear account"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
              {trimmedAddress}
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
            Balance: {isLoading ? "Loading..." : `${balance} ETH`}
          </p>
        </div>
      </div>
    </div>
  );
}
