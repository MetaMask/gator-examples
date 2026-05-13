import type { Request, Response, NextFunction } from "express";
import {
  USDC_ADDRESS,
  NETWORK_ID,
  PAY_TO_ADDRESS,
} from "./config.js";
import type {
  PaymentPayload,
  PaymentRequirements,
  VerifyResult,
  SettleResult,
} from "./types.js";
import { facilitatorPost, getFacilitatorAddresses } from "./utils.js";

export interface PaymentMiddlewareOptions {
  amount: string;
  description?: string;
  mimeType?: string;
}

function verifyPayment(
  paymentPayload: PaymentPayload,
  paymentRequirements: PaymentRequirements
): Promise<VerifyResult> {
  return facilitatorPost("verify", { paymentPayload, paymentRequirements });
}

function settlePayment(
  paymentPayload: PaymentPayload,
  paymentRequirements: PaymentRequirements
): Promise<SettleResult> {
  return facilitatorPost("settle", { paymentPayload, paymentRequirements });
}

export function createPaymentMiddleware(options: PaymentMiddlewareOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const facilitatorAddresses = await getFacilitatorAddresses().catch(() => []);
    const paymentRequirements: PaymentRequirements = {
      scheme: "exact",
      network: NETWORK_ID,
      amount: options.amount,
      asset: USDC_ADDRESS,
      payTo: PAY_TO_ADDRESS,
      maxTimeoutSeconds: 60,
      extra: {
        assetTransferMethod: "erc7710",
        // The facilitator addresses are used by clients to create the
        // ERC-7710 payment payload.
        facilitators: facilitatorAddresses,
      },
    };

    const paymentHeader =
      (req.headers["payment-signature"] as string) ||
      (req.headers["x-payment-signature"] as string);

    if (!paymentHeader) {
      const paymentRequired = {
        x402Version: 2,
        accepts: [paymentRequirements],
        description:
          options.description || "Payment required to access this resource",
        mimeType: options.mimeType || "application/json",
      };

      const encoded = Buffer.from(JSON.stringify(paymentRequired)).toString(
        "base64"
      );

      res.setHeader("PAYMENT-REQUIRED", encoded);
      res.status(402).json({
        error: "Payment Required",
        paymentRequired,
      });
      return;
    }

    let paymentPayload: PaymentPayload;
    try {
      const decoded = Buffer.from(paymentHeader, "base64").toString("utf-8");
      paymentPayload = JSON.parse(decoded);
    } catch {
      res.status(400).json({ error: "Invalid PAYMENT-SIGNATURE header" });
      return;
    }

    let verifyResult: VerifyResult;
    try {
      verifyResult = await verifyPayment(paymentPayload, paymentRequirements);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Verification failed";
      res.status(502).json({ error: message });
      return;
    }

    if (!verifyResult.isValid) {
      res.status(402).json({
        error: "Payment verification failed",
        reason: verifyResult.invalidReason,
        message: verifyResult.invalidMessage,
      });
      return;
    }

    let settleResult: SettleResult;
    try {
      settleResult = await settlePayment(paymentPayload, paymentRequirements);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Settlement failed";
      res.status(502).json({ error: message });
      return;
    }

    if (!settleResult.success) {
      res.status(402).json({
        error: "Payment settlement failed",
        reason: settleResult.errorReason,
        message: settleResult.errorMessage,
      });
      return;
    }

    console.log("[x402] Settlement:", `tx ${settleResult.transaction}`);
    const paymentResponse = {
      x402Version: 2,
      scheme: paymentRequirements.scheme,
      network: NETWORK_ID,
      payer: verifyResult.payer,
    };
    const encodedResponse = Buffer.from(JSON.stringify(paymentResponse)).toString(
      "base64"
    );
    res.setHeader("PAYMENT-RESPONSE", encodedResponse);

    next();
  };
}
