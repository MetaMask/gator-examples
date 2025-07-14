import {
  CodeBlock,
  Keyword,
  Variable,
  Method,
  Property,
  StringLiteral,
  NumberLiteral,
} from "@/components/CodeBlock";

export default function CreateDelegationCodeBlock() {
  const lines = [
    {
      prefix: "$" as const,
      content: "// utils/delegationUtils.ts",
    },
    {
      prefix: ">" as const,
      content: (
        <>
          <Keyword>const</Keyword> <Variable>caveats</Variable> ={" "}
          <Method>createCaveatBuilder</Method>(<Variable>smartAccount</Variable>
          .<Property>environment</Property>)
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          .<Method>addCaveat</Method>(
          <StringLiteral>"limitedCalls"</StringLiteral>,{" "}
          <NumberLiteral>1</NumberLiteral>)
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          .<Method>build</Method>()
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
          <Keyword>const</Keyword> <Variable>delegation</Variable> ={" "}
          <Method>createDelegation</Method>({`{`}
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>to</Property>: <Variable>delegateSmartAccount</Variable>.
          <Property>address</Property>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>from</Property>: <Variable>smartAccount</Variable>.
          <Property>address</Property>,
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>caveats</Property>: <Variable>caveats</Variable>,
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
      content: "// components/CreateDelegationButton.tsx",
    },
    {
      prefix: ">" as const,
      content: (
        <>
          <Keyword>const</Keyword> <Variable>signature</Variable> ={" "}
          <Keyword>await</Keyword> <Variable>smartAccount</Variable>.
          <Method>signDelegation</Method>({`{`}
        </>
      ),
    },
    {
      prefix: ">" as const,
      content: (
        <>
          {" "}
          <Property>delegation</Property>,
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
      prefix: ">" as const,
      content: (
        <>
          <Keyword>const</Keyword> <Variable>signedDelegation</Variable> ={" "}
          {`{ ...`}
          <Variable>delegation</Variable>, <Variable>signature</Variable> {`}`}
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
          <Method>storeDelegation</Method>(<Variable>signedDelegation</Variable>
          ) <StringLiteral>// Persisted!</StringLiteral>
        </>
      ),
    },
  ];

  return <CodeBlock lines={lines} />;
}
