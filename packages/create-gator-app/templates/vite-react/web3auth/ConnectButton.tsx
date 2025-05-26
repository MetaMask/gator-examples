import { useWeb3AuthConnect } from '@web3auth/modal/react';

export default function ConnectButton() {
  const { connect } = useWeb3AuthConnect();

  return (
    <div className="button-container">
      <button className="button" onClick={() => connect()}>
        Connect with Web3Auth
      </button>
    </div>
  );
}
