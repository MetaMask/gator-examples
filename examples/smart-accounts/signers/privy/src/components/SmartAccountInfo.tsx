"use client";

import useSmartAccount from "@/hooks/useSmartAccount";
import { useBalance } from "wagmi";
import { formatEther } from "viem";

export default function SmartAccountInfo() {
    const { smartAccount } = useSmartAccount();
    const { data: balance, isLoading } = useBalance({
        address: smartAccount?.address,
    });

    if (!smartAccount?.address) {
        return null;
    }

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 mb-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
                <p className="text-xs text-white/70 mb-1">Smart Account</p>
                <p className="text-white font-mono text-xs truncate">
                    {smartAccount.address}
                </p>
            </div>
            <div className="text-right">
                <p className="text-xs text-white/70 mb-1">Balance</p>
                <p className="text-white font-semibold text-sm">
                    {isLoading ? (
                        <span className="text-white/50">...</span>
                    ) : balance ? (
                        `${formatEther(balance.value)} ${balance.symbol}`
                    ) : (
                        <span className="text-white/50">0 ETH</span>
                    )}
                </p>
            </div>
        </div>
    );
}

