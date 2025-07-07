import ConnectButton from "@/components/ConnectButton";
import TransactionForm from "@/components/TransactionForm";
import { useAccount } from "wagmi";

export default function Steps() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <p className="text-white/70 leading-relaxed">
          The first step would be to connect your wallet.
          <br />
          <br />
          You can customize the Wagmi configuration to connect to any chain
          supported by the MetaMask Smart Accounts, and use any connector you
          prefer. The connected wallet will serve as the signer for your smart
          account.
        </p>
        <ConnectButton />
      </div>
    );
  } else {
    return (
      <div className="max-w-2xl mx-auto">
        <p className="text-white/70 leading-relaxed">
          Once you have connected your wallet, you can send a user operation
          from the smart account.
          <br />
          <br />
          The smart account will remain counterfactual until the first user
          operation. If the smart account is not deployed, it will be
          automatically deployed upon the sending first user operation.
        </p>
        <TransactionForm />
      </div>
    );
  }
}
