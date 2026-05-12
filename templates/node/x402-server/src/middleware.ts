import type { Request, Response, NextFunction } from "express";
import {
  USDC_ADDRESS,
  NETWORK_ID,
  PAY_TO_ADDRESS,
  FACILITATOR_URL,
} from "./config.js";
import type {
  PaymentPayload,
  PaymentRequirements,
  VerifyResult,
  SettleResult,
} from "./types.js";

export interface PaymentMiddlewareOptions {
  amount: string;
  description?: string;
  mimeType?: string;
}

async function verifyPayment(
  paymentPayload: PaymentPayload,
  paymentRequirements: PaymentRequirements
): Promise<VerifyResult> {
  const res = await fetch(`${FACILITATOR_URL}/platform/v2/x402/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentPayload, paymentRequirements }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(error.error || `Facilitator verify failed: ${res.status}`);
  }
  return res.json();
}

async function settlePayment(
  paymentPayload: PaymentPayload,
  paymentRequirements: PaymentRequirements
): Promise<SettleResult> {
  const res = await fetch(`${FACILITATOR_URL}/platform/v2/x402/settle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentPayload, paymentRequirements }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(error.error || `Facilitator settle failed: ${res.status}`);
  }
  return res.json();
}

export function createPaymentMiddleware(options: PaymentMiddlewareOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const paymentRequirements: PaymentRequirements = {
      scheme: "exact",
      network: NETWORK_ID,
      amount: options.amount,
      asset: USDC_ADDRESS,
      payTo: PAY_TO_ADDRESS,
      maxTimeoutSeconds: 60,
      extra: {
        assetTransferMethod: "erc7710",
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
        mimeType: options.mimeType || "text/plain",
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

    // Fail fast before hitting the facilitator
    if (
      paymentPayload.accepted.payTo.toLowerCase() !==
      PAY_TO_ADDRESS.toLowerCase()
    ) {
      res.status(402).json({ error: "Payment payTo address mismatch" });
      return;
    }
    if (paymentPayload.accepted.network !== NETWORK_ID) {
      res.status(402).json({ error: "Payment network mismatch" });
      return;
    }
    if (paymentPayload.accepted.extra?.assetTransferMethod !== "erc7710") {
      res.status(402).json({ error: "Only erc7710 asset transfer method is supported" });
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

    res.locals.paymentPayload = paymentPayload;
    res.locals.paymentRequirements = paymentRequirements;

    function attachPaymentResponse() {
      settlePayment(res.locals.paymentPayload, res.locals.paymentRequirements)
        .then((settleResult) => {
          console.log(
            "[x402] Settlement:",
            settleResult.success
              ? `tx ${settleResult.transaction}`
              : `failed: ${settleResult.errorMessage}`
          );
        })
        .catch((err) => {
          console.error("[x402] Settlement error:", err);
        });

      const paymentResponse = {
        x402Version: 2,
        scheme: paymentRequirements.scheme,
        network: NETWORK_ID,
        payer: verifyResult.payer,
      };
      const encodedResponse = Buffer.from(
        JSON.stringify(paymentResponse)
      ).toString("base64");
      res.setHeader("PAYMENT-RESPONSE", encodedResponse);
    }

    const originalJson = res.json.bind(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.json = function (body?: any) {
      attachPaymentResponse();
      return originalJson(body);
    };

    const originalSend = res.send.bind(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.send = function (body?: any) {
      attachPaymentResponse();
      return originalSend(body);
    };

    next();
  };
}
