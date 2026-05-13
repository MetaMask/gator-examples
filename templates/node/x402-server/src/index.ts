import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import { parseUnits } from "viem";
import { createPaymentMiddleware } from "./middleware.js";
import {
  PORT,
  NETWORK_ID,
  PAY_TO_ADDRESS,
  FACILITATOR_URL,
} from "./config.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const api = express.Router();
api.use(
  createPaymentMiddleware({
    amount: parseUnits("0.01", 6).toString(),
    description: "Access to protected resource",
    mimeType: "application/json",
  })
);

api.get("/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

app.use("/api", api);

function start() {
  app.listen(PORT, () => {
    console.log(`[seller] Server running on http://localhost:${PORT}`);
    console.log(`[seller] Pay-to address: ${PAY_TO_ADDRESS}`);
    console.log(`[seller] Facilitator URL: ${FACILITATOR_URL}`);
    console.log(`[seller] Network: ${NETWORK_ID}`);
  });
}

start();
