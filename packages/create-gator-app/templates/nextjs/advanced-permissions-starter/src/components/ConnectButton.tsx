"use client";

import { useConnect } from "wagmi";
import Button from "@/components/Button";
import { metaMask } from "wagmi/connectors";

export default function ConnectButton() {
    const { connect } = useConnect();

    return (
        <Button className="w-full space-x-2" onClick={() => connect({ connector: metaMask() })}>
            <span>Connect with MetaMask</span>
        </Button>
    );
}