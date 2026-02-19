import {
  CodeBlock,
  Variable,
  Method,
  Property,
  StringLiteral,
  Comment,
} from "@/components/CodeBlock";

export default function CreateDelegatorCodeBlock() {
  const lines = [
    {
      prefix: "$" as const,
      content: "// Create delegator smart account",
    },
    {
      prefix: ">" as const,
      content: (
        <>
          <Variable>smartAccount</Variable> ={" "}
          <Method>toMetaMaskSmartAccount</Method>({`{`}
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>client</Property>: <Variable>publicClient</Variable>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>implementation</Property>:{" "}
          <Variable>Implementation</Variable>.
          <StringLiteral>Hybrid</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>deployParams</Property>: [<Variable>userAddress</Variable>,
          [], [], []],
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>deploySalt</Property>: <StringLiteral>"0x"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>signer</Property>: {`{ `}
          <Variable>walletClient</Variable>
          {` }`},
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: "})",
    },
    {
      prefix: ">" as const,
      content: "",
    },
    {
      prefix: "$" as const,
      content: "// Deploy smart account on first transaction",
    },
    {
      prefix: ">" as const,
      content: (
        <>
          <Variable>userOperationHash</Variable> ={" "}
          <Variable>bundlerClient</Variable>.<Method>sendUserOperation</Method>(
          {`{`}
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
          <Property>calls</Property>: [<Variable>dummyTransaction</Variable>],
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>paymaster</Property>: <Variable>paymasterClient</Variable>,{" "}
          <Comment>// Sponsored gas</Comment>
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