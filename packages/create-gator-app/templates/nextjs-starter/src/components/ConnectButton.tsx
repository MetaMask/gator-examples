"use client";

import { injected, useConnect } from "wagmi";

export default function ConnectButton() {
  const { connect } = useConnect();
  return (
    <button
      className="button"
      onClick={() => connect({ connector: injected() })}
    >
      Connect
    </button>
  );
}
