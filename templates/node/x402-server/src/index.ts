import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import { type Address } from "viem";
import { createPaymentMiddleware } from "./middleware.js";
import {
  PORT,
  NETWORK_ID,
  USDC_ADDRESS,
  PAY_TO_ADDRESS,
  FACILITATOR_URL,
} from "./config.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

let facilitatorAddress: Address | null = null;

async function fetchFacilitatorAddress(): Promise<Address> {
  const res = await fetch(`${FACILITATOR_URL}/platform/v2/x402/supported`);
  if (!res.ok) throw new Error("Failed to fetch facilitator supported info");
  const data = await res.json();
  const signers: Address[] | undefined =
    data.signers?.[NETWORK_ID] ?? data.signers?.["eip155:*"];
  if (signers && signers.length > 0) return signers[0];
  throw new Error("Facilitator address not found in /supported response");
}

// ─── Protected resource ──────────────────────────────────────────────────────

const helloPaymentMiddleware = createPaymentMiddleware({
  amount: "10000", // 0.01 USDC (6 decimals)
  description: "Access to protected hello resource",
  mimeType: "text/plain",
});

app.get("/api/hello", helloPaymentMiddleware, (_req: Request, res: Response) => {
  res.send("Hello!");
});

app.get("/info", (_req: Request, res: Response) => {
  res.json({
    payToAddress: PAY_TO_ADDRESS,
    facilitatorAddress,
    network: NETWORK_ID,
    asset: USDC_ADDRESS,
    supportedMethods: ["erc7710"],
  });
});

async function start() {
  try {
    facilitatorAddress = await fetchFacilitatorAddress();
    console.log(`[server] Facilitator address: ${facilitatorAddress}`);
  } catch (err) {
    console.warn(
      `[server] Could not fetch facilitator address: ${err instanceof Error ? err.message : err}`
    );
  }

  app.listen(PORT, () => {
    console.log(`[server] Running on http://localhost:${PORT}`);
    console.log(`[server] Pay-to address: ${PAY_TO_ADDRESS}`);
    console.log(`[server] Facilitator URL: ${FACILITATOR_URL}`);
    console.log(`[server] Network: ${NETWORK_ID}`);
  });
}

start();
