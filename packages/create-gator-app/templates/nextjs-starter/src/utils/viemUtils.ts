"use client";

import { http } from "viem";
import {
  createBundlerClient,
  createPaymasterClient,
} from "viem/account-abstraction";

export const bundlerClient = createBundlerClient({
  transport: http(
    `https://api.pimlico.io/v2/11155111/rpc?apikey=${process.env.PIMLICO_API_KEY}`
  ),
});

export const paymasterClient = createPaymasterClient({
  transport: http(
    `https://api.pimlico.io/v2/11155111/rpc?apikey=${process.env.PIMLICO_API_KEY}`
  ),
});
