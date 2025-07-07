"use client";

import { createContext, useCallback, useState } from "react";
import { Hex } from "viem";
import { generatePrivateKey } from "viem/accounts";

export const GatorContext = createContext({
  delegateWallet: "0x",
  generateDelegateWallet: () => {},
});

export const GatorProvider = ({ children }: { children: React.ReactNode }) => {
  const [delegateWallet, setDelegateWallet] = useState<Hex>("0x");

  const generateDelegateWallet = useCallback(() => {
    const privateKey = generatePrivateKey();
    setDelegateWallet(privateKey);
  }, []);

  return (
    <GatorContext.Provider value={{ delegateWallet, generateDelegateWallet }}>
      {children}
    </GatorContext.Provider>
  );
};
