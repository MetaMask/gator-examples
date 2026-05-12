import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import type { Address } from "viem";
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

async function fetchFacilitatorAddress(): Promise<Address> {
  const res = await fetch(`${FACILITATOR_URL}/platform/v2/x402/supported`);
  if (!res.ok) throw new Error("Failed to fetch facilitator supported info");
  const data = await res.json();
  const address = data.signers?.["eip155:*"]?.[0] as Address;
  if (!address) throw new Error("Facilitator address not found in /supported response");
  return address;
}

const api = express.Router();
api.use(
  createPaymentMiddleware({
    amount: "10000", // 0.01 USDC (6 decimals)
    description: "Access to protected resource",
    mimeType: "application/json",
    getFacilitatorAddress: fetchFacilitatorAddress,
  })
);

api.get("/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

app.use("/api", api);

app.get("/info", async (_req: Request, res: Response) => {
  try {
    const facilitatorAddress = await fetchFacilitatorAddress();
    res.json({
      payToAddress: PAY_TO_ADDRESS,
      facilitatorAddress,
      network: NETWORK_ID,
      asset: USDC_ADDRESS,
      supportedMethods: ["erc7710"],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch facilitator address";
    res.status(503).json({ error: message });
  }
});

function start() {
  app.listen(PORT, () => {
    console.log(`[seller] Server running on http://localhost:${PORT}`);
    console.log(`[seller] Pay-to address: ${PAY_TO_ADDRESS}`);
    console.log(`[seller] Facilitator URL: ${FACILITATOR_URL}`);
    console.log(`[seller] Network: ${NETWORK_ID}`);
  });
}

start();
