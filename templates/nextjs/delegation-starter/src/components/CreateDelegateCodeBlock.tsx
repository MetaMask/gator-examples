import {
  Keyword,
  Variable,
  Method,
  Property,
  StringLiteral,
  CodeBlock,
} from "@/components/CodeBlock";

export default function CreateDelegateCodeBlock() {
  const lines = [
    {
      prefix: "$" as const,
      content: "// Create delegate smart account",
    },
    {
      prefix: ">" as const,
      content: (
        <>
          <Keyword>const</Keyword> <Variable>account</Variable> ={" "}
          <Method>privateKeyToAccount</Method>(
          <Variable>delegateWallet</Variable>)
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
          <Keyword>const</Keyword> <Variable>delegateSmartAccount</Variable> ={" "}
          <Keyword>await</Keyword> <Method>toMetaMaskSmartAccount</Method>({`{`}
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
          <Property>deployParams</Property>: [<Variable>account</Variable>.
          <Property>address</Property>, [], [], []],
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
          <Variable>account</Variable>
          {` }`},
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