import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import { formatEther } from "viem";
import { useBalance } from "wagmi";

export default function AccountCard() {
  const { smartAccount } = useDelegatorSmartAccount();
  const { data: balance } = useBalance({
    address: smartAccount?.address,
  });

  return (
    <div className="bg-gray-800 border border-gray-700 p-3 rounded">
      <div className="flex justify-between items-center space-x-8">
        <div>
          <p className="text-gray-300 text-sm font-mono">
            {smartAccount?.address.slice(0, 6)}...
            {smartAccount?.address.slice(-4)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-300 text-sm font-mono">
            {balance
              ? `${formatEther(BigInt(balance.value))} ${balance.symbol}`
              : "0.0000"}
          </p>
        </div>
      </div>
    </div>
  );
}
