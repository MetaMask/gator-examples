"use client";

import { createPimlicoClient } from "permissionless/clients/pimlico";
import { http } from "viem";

export const pimlicoClient = createPimlicoClient({
  transport: http(
    `https://api.pimlico.io/v2/11155111/rpc?apikey=${process.env.PIMLICO_API_KEY}`
  ),
});
