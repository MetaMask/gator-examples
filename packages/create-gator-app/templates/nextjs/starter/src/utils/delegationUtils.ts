import {
  createDelegation,
  createExecution,
  Delegation,
  DelegationFramework,
  SINGLE_DEFAULT_MODE,
} from "@metamask/delegation-toolkit";
import { Address, Hex } from "viem";

export function prepareRootDelegation(
  delegator: Address,
  delegate: Address
): Delegation {
  console.log(delegate, delegator);
  return createDelegation({
    to: delegate,
    from: delegator,
    caveats: [],
  });
}

export function prepareRedeemDelegationData(delegation: Delegation): Hex {
  const execution = createExecution();
  const data = DelegationFramework.encode.redeemDelegations({
    delegations: [[delegation]],
    modes: [SINGLE_DEFAULT_MODE],
    executions: [[execution]],
  });

  return data;
}
