"use client";

import { useConnect } from "wagmi";

export default function ConnectButton() {
  const { connect, connectors } = useConnect();

  return (
    <div className="button-container">
      {connectors.map((connector) => (
        <button
          className="button"
          onClick={() => connect({ connector })}
          key={connector.id}
        >
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
}
