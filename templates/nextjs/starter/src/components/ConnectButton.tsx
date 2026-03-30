"use client";

import { useConnect, useConnectors } from "wagmi";
import Button from "@/components/Button";

export default function ConnectButton() {
  const connect = useConnect();
  const connectors = useConnectors();

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <Button onClick={() => connect.mutate({ connector })} key={connector.id}>
          Connect with {connector.name}
        </Button>
      ))}
    </div>
  );
}
