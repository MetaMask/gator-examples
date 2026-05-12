import type { Address, Hex } from "viem";

export interface PaymentPayload {
  x402Version: number;
  accepted: {
    scheme: string;
    network: string;
    amount: string;
    asset: Address;
    payTo: Address;
    maxTimeoutSeconds: number;
    extra: {
      assetTransferMethod: string;
      [key: string]: unknown;
    };
  };
  payload: {
    delegationManager: Address;
    permissionContext: Hex;
    delegator: Address;
  };
}

export interface PaymentRequirements {
  scheme: string;
  network: string;
  amount: string;
  asset: Address;
  payTo: Address;
  maxTimeoutSeconds: number;
  extra: {
    assetTransferMethod: string;
    [key: string]: unknown;
  };
}

export interface VerifyResult {
  isValid: boolean;
  invalidReason?: string;
  invalidMessage?: string;
  payer?: Address;
}

export interface SettleResult {
  success: boolean;
  transaction?: Hex;
  network?: string;
  errorReason?: string;
  errorMessage?: string;
  payer?: Address;
}
