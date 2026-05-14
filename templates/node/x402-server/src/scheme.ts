import { ExactEvmScheme } from "@x402/evm/exact/server";
import type {
  PaymentRequirements,
  Network,
  Price,
  AssetAmount,
  SupportedKind,
  SchemeNetworkServer,
} from "@x402/core/types";
import type { FacilitatorClient } from "@x402/core/server";

export class Erc7710EvmScheme implements SchemeNetworkServer {
  readonly scheme = "exact";
  private readonly inner = new ExactEvmScheme();

  constructor(private readonly facilitatorClient: FacilitatorClient) {}

  async parsePrice(price: Price, network: Network): Promise<AssetAmount> {
    return this.inner.parsePrice(price, network);
  }

  getAssetDecimals(asset: string, network: Network): number {
    return this.inner.getAssetDecimals?.(asset, network) ?? 6;
  }

  async enhancePaymentRequirements(
    paymentRequirements: PaymentRequirements,
    supportedKind: SupportedKind,
    facilitatorExtensions: string[],
  ): Promise<PaymentRequirements> {
    const enhanced = await this.inner.enhancePaymentRequirements(
      paymentRequirements,
      supportedKind,
      facilitatorExtensions,
    );

    const supported = await this.facilitatorClient.getSupported();
    const facilitators =
      supported.signers[paymentRequirements.network] ??
      supported.signers["eip155:*"] ??
      [];

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
