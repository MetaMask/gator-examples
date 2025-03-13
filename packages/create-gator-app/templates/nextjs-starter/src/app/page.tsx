"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { generatePrivateKey } from "viem/accounts";
import { Hex } from "viem";
import { AppContext } from "@/providers/AppProvider";
import Steps from "@/components/Steps";
import Hero from "@/components/Hero";

export default function Home() {
  const [delegateWallet, setDelegateWallet] = useState<Hex>("0x");
  const [step, setStep] = useState(1);

  function generateDelegateWallet() {
    const privateKey = generatePrivateKey();
    setDelegateWallet(privateKey);
  }

  function changeStep(step: number) {
    setStep(step);
  }

  return (
    <AppContext.Provider
      value={{
        delegateWallet,
        generateDelegateWallet: generateDelegateWallet,
        step,
        setStep: changeStep,
      }}
    >
      <div className={styles.page}>
        <main className={styles.main}>
          <Hero />

          <Steps />
        </main>
        <footer className={styles.footer}>
          <a
            href="https://docs.gator.metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Docs
          </a>
          <a
            href="https://github.com/gator-metamask/gator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
        </footer>
      </div>
    </AppContext.Provider>
  );
}
