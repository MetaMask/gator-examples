"use client";

import { Delegation } from "@metamask/smart-accounts-kit";

export default function useStorageClient() {
  function storeDelegation(delegation: Delegation) {
    localStorage.setItem(
      delegation.delegate,
      JSON.stringify(delegation, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  }

  function getDelegation(delegate: string): Delegation | null {
    const delegation = localStorage.getItem(delegate);
    if (!delegation) {
      return null;
    }
    return JSON.parse(delegation);
  }

  return { storeDelegation, getDelegation };
}