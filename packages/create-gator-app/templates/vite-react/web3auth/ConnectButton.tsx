import { useWeb3AuthConnect } from "@web3auth/modal/react";
import Button from "@/components/Button";

export default function ConnectButton() {
  const { connect } = useWeb3AuthConnect();

  return (
    <div className="button-container">
      <Button onClick={() => connect()}>
        Connect with Web3Auth
      </Button>
    </div>
  );
}
