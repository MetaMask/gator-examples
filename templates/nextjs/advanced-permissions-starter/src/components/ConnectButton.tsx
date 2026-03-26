"use client";

import { useAccount, useChainId, useConnect, useSwitchChain } from "wagmi";
import Button from "@/components/Button";
import { metaMask } from "wagmi/connectors";

export default function ConnectButton() {
    const { connect } = useConnect();
    const { chainId: connectedChainId, isConnected } = useAccount();
    const { switchChain } = useSwitchChain();
    const currentChainId = useChainId();

    if (isConnected && connectedChainId !== currentChainId) {
        return (
            <Button className="w-full space-x-2" onClick={() => switchChain({ chainId: currentChainId })}>
                <span>Switch Chain</span>
            </Button>
        );
    }

    return (
        <Button className="w-full space-x-2" onClick={() => connect({ connector: metaMask() })}>
            <span>Connect with MetaMask</span>
        </Button>
    );
}