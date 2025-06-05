"use client";

import { useConnect } from "wagmi";
import Button from "@/components/Button";

export default function ConnectButton() {
  const { connect, connectors } = useConnect();

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <Button onClick={() => connect({ connector })} key={connector.id}>
          Connect with {connector.name}
        </Button>
      ))}
    </div>
  );
}
