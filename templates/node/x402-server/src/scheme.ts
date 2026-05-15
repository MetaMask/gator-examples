import { ExactEvmScheme } from "@x402/evm/exact/server";
import type {
  PaymentRequirements,
  SupportedKind,
} from "@x402/core/types";
import type { FacilitatorClient } from "@x402/core/server";

export class Erc7710ExactEvmScheme extends ExactEvmScheme {
  constructor(private readonly facilitatorClient: FacilitatorClient) {
    super();
  }

  async enhancePaymentRequirements(
    paymentRequirements: PaymentRequirements,
    supportedKind: SupportedKind,
    facilitatorExtensions: string[],
  ): Promise<PaymentRequirements> {
    const enhanced = await super.enhancePaymentRequirements(
      paymentRequirements,
      supportedKind,
      facilitatorExtensions,
    );

    const supported = await this.facilitatorClient.getSupported();
    const facilitators = [
      ...(supported.signers[paymentRequirements.network] ?? []),
      ...(supported.signers["eip155:*"] ?? [])
    ];

    return {
      ...enhanced,
      extra: {
        ...enhanced.extra,
        assetTransferMethod: "erc7710",
        facilitators,
      },
    };
  }
}
