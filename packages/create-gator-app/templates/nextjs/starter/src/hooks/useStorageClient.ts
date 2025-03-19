"use client";

import { DelegationStruct } from "@metamask-private/delegator-core-viem";

export default function useStorageClient() {
  function storeDelegation(delegation: DelegationStruct) {
    localStorage.setItem(
      delegation.delegate,
      JSON.stringify(delegation, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  }

  function getDelegation(delegate: string): DelegationStruct | null {
    const delegation = localStorage.getItem(delegate);
    if (!delegation) {
      return null;
    }
    return JSON.parse(delegation);
  }

  return { storeDelegation, getDelegation };
}
