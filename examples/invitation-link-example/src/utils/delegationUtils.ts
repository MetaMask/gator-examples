import {
  BalanceChangeType,
  createCaveatBuilder,
  createExecution,
  createOpenDelegation,
  Delegation,
  DelegationFramework,
  MetaMaskSmartAccount,
  SINGLE_DEFAULT_MODE,
} from "@metamask/delegation-toolkit";
import { Address, Hex } from "viem";

export function prepareRootDelegation(
  delegator: MetaMaskSmartAccount,
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
    .addCaveat("nativeBalanceChange",
      delegator.address,
      // 0.0001 ETH
      100000000000000n,
      BalanceChangeType.Decrease,
    ).build();

  return createOpenDelegation({
    from: delegator.address,
    caveats: caveats,
  });
}

export function prepareRedeemDelegationData(delegation: Delegation, recipient: Address): Hex {
  const execution = createExecution(recipient, 100000000000000n);
  const data = DelegationFramework.encode.redeemDelegations({
    delegations: [[delegation]],
    modes: [SINGLE_DEFAULT_MODE],
    executions: [[execution]],
  });

  return data;
}

export function encodeDelegation(delegation: Delegation): string {
  const delegationJson = JSON.stringify(delegation);
  return Buffer.from(delegationJson, 'utf-8').toString('base64');
}

export function decodeDelegation(encodedDelegation: string): Delegation {
  const decodedDelegationJson = Buffer.from(encodedDelegation, 'base64').toString('utf-8');
  return JSON.parse(decodedDelegationJson) as Delegation;
}
