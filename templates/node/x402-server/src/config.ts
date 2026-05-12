import { type Address } from "viem";
import "dotenv/config";

export const NETWORK_ID = "eip155:8453" as const;

export const USDC_ADDRESS: Address =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export const PAY_TO_ADDRESS = process.env.PAY_TO_ADDRESS as Address;
if (!PAY_TO_ADDRESS) {
  throw new Error("PAY_TO_ADDRESS environment variable is required");
}

export const FACILITATOR_URL = process.env.FACILITATOR_URL as string;
if (!FACILITATOR_URL) {
  throw new Error("FACILITATOR_URL environment variable is required");
}

export const PORT = parseInt(process.env.PORT || "4402", 10);
