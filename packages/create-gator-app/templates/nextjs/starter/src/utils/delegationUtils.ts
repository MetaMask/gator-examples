import {
  createCaveatBuilder,
  createDelegation,
  createExecution,
  Delegation,
  MetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";
import { DelegationManager } from "@metamask/delegation-toolkit/contracts";
import { SINGLE_DEFAULT_MODE } from "@metamask/delegation-toolkit/utils";
import { Address, Hex, zeroAddress } from "viem";

export function prepareRootDelegation(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
): Delegation {
  // The following caveat enforcer is a simple example that limits
  // the number of executions the delegate can perform on the delegator's
  // behalf.

  // You can add more caveat enforcers to the delegation as needed to restrict
  // the delegate's actions. Checkout delegation-toolkit docs for more
  // information on restricting delegate's actions.

  // Restricting a delegation:
  // https://docs.metamask.io/delegation-toolkit/how-to/create-delegation/restrict-delegation/
  const caveats = createCaveatBuilder(delegator.environment)
    .addCaveat("limitedCalls", 1)
    .build();

  return createDelegation({
    to: delegate,
    from: delegator.address,
    caveats: caveats,
  });
}

export function prepareRedeemDelegationData(delegation: Delegation): Hex {
  const execution = createExecution({ target: zeroAddress });
  const data = DelegationManager.encode.redeemDelegations({
    delegations: [[delegation]],
    modes: [SINGLE_DEFAULT_MODE],
    executions: [[execution]],
  });

  return data;
}
