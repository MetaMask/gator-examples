import {
  createExecution,
  createRootDelegation,
  DelegationFramework,
  DelegationStruct,
  SINGLE_DEFAULT_MODE,
} from "@metamask-private/delegator-core-viem";
import { Address, Hex } from "viem";

export function prepareRootDelegation(
  delegator: Address,
  delegate: Address
): DelegationStruct {
  console.log(delegate, delegator);
  return createRootDelegation(delegate, delegator, []);
}

export function prepareRedeemDelegationData(delegation: DelegationStruct): Hex {
  const execution = createExecution();
  const data = DelegationFramework.encode.redeemDelegations(
    [[delegation]],
    [SINGLE_DEFAULT_MODE],
    [[execution]]
  );

  return data;
}
