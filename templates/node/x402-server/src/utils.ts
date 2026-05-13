import type { Address } from "viem";
import { FACILITATOR_URL, NETWORK_ID } from "./config.js";

interface SupportedResponse {
  signers?: Record<string, Address[] | undefined>;
}

export async function facilitatorPost<T>(
  endpoint: string,
  body: object
): Promise<T> {
  const res = await fetch(`${FACILITATOR_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(error.error || `Facilitator ${endpoint} failed: ${res.status}`);
  }

  return res.json();
}

export async function getFacilitatorAddresses(): Promise<Address[]> {
  const res = await fetch(`${FACILITATOR_URL}/supported`);
  if (!res.ok) {
    throw new Error("Failed to fetch facilitator supported info");
  }

  const data = (await res.json()) as SupportedResponse;
  const signers = data.signers?.[NETWORK_ID] ?? data.signers?.["eip155:*"] ?? [];
  if (!signers.length) {
    throw new Error("Facilitator signers not found in /supported response");
  }

  return [...new Set(signers)];
}

export async function getFacilitatorAddress(): Promise<Address> {
  const [address] = await getFacilitatorAddresses();
  if (!address) {
    throw new Error("Facilitator address not found in /supported response");
  }
  return address;
}
