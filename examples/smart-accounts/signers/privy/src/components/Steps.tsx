
import TransactionForm from "@/components/TransactionForm";
import SmartAccountInfo from "@/components/SmartAccountInfo";
import { useAccount } from "wagmi";
import ConnectButton from "./ConnectButton";

export default function Steps() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <p className="text-white/70 leading-relaxed">
          The first step is to connect your wallet.
          <br />
          <br />
          You can customize the Wagmi configuration to connect to any chain
          supported by the MetaMask Smart Accounts. The connected wallet will serve
          as the signer for your smart account.
        </p>
        <ConnectButton />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4">
        <SmartAccountInfo />
        <TransactionForm />
      </div>
    );
  }
}
