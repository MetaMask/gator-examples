import {
  Keyword,
  Variable,
  Method,
  Property,
  CodeBlock,
} from "@/components/CodeBlock";

export default function RedeemDelegationCodeBlock() {
  const lines = [
    {
      prefix: "$" as const,
      content: "// utils/delegationUtils.ts",
    },
    {
      prefix: ">" as const,
      content: (
        <>
          <Keyword>const</Keyword> <Variable>execution</Variable> ={" "}
          <Method>createExecution</Method>(
            {`{ `}
            <Property>target</Property>: <Variable>zeroAddress</Variable>
            {` }`}
          )
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: <br />,
    },
    {
      prefix: ">" as const,
      content: (
        <>
          <Keyword>const</Keyword> <Variable>data</Variable> ={" "}
          <Variable>DelegationManager</Variable>.<Property>encode</Property>.
          <Method>redeemDelegations</Method>({`{`}
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>delegations</Property>: [[<Variable>delegation</Variable>]],
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>modes</Property>: [<Variable>ExecutionMode.SingleDefault</Variable>
          ],
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>executions</Property>: [[<Variable>execution</Variable>]],
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: "})",
    },
    {
      prefix: ">" as const,
      content: <br />,
    },
    {
      prefix: "$" as const,
      content: "// components/RedeemDelegationButton.tsx",
    },
    {
      prefix: ">" as const,
      content: (
        <>
          <Keyword>const</Keyword> <Variable>userOperationHash</Variable> ={" "}
          <Keyword>await</Keyword> <Variable>bundlerClient</Variable>.
          <Method>sendUserOperation</Method>({`{`}
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>account</Property>: <Variable>smartAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>calls</Property>: [{`{`}
        </>
      ),
    },
    {
      prefix: "$" as const,
      content: (
        <>
          {"  "}// You can use the delegateSmartAccount to retrieve the
          DeleGatorEnvironment
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {"  "}
          <Property>to</Property>: <Variable>delegateSmartAccount</Variable>.
          <Property>environment</Property>.
          <Property>DelegationManager</Property>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {"  "}
          <Property>data</Property>: <Variable>redeemData</Variable>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: " }],",
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          ...<Variable>fee</Variable>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>paymaster</Property>: <Variable>paymasterClient</Variable>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: "})",
    },
  ];

  return <CodeBlock lines={lines} />;
}