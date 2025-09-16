import {
  createDelegation,
  createExecution,
  Delegation,
  MetaMaskSmartAccount,
  ExecutionMode,
} from "@metamask/delegation-toolkit";
import { DelegationManager } from "@metamask/delegation-toolkit/contracts";
import { Address, Hex, parseEther, zeroAddress } from "viem";

export function prepareRootDelegation(
  delegator: MetaMaskSmartAccount,
  delegate: Address
): Delegation {
  // The following scope is a simple example that limits
  // the number of native token transfers the delegate can perform on the delegator's
  // behalf.

  // You can add more caveats to the delegation as needed to restrict
  // the delegate's actions. Checkout delegation-toolkit docs for more
  // information on restricting delegate's actions.

  // Restricting a delegation:
  // https://docs.metamask.io/delegation-toolkit/how-to/create-delegation/restrict-delegation/

  return createDelegation({
    scope: {
      type: "nativeTokenTransferAmount",
      maxAmount: parseEther("0.001"),
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

export function prepareRedeemDelegationData(delegation: Delegation): Hex {
  const execution = createExecution({ target: zeroAddress });
  const data = DelegationManager.encode.redeemDelegations({
    delegations: [[delegation]],
    modes: [ExecutionMode.SingleDefault],
    executions: [[execution]],
  });

  return data;
}
