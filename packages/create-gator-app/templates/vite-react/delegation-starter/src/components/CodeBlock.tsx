import React from "react";

interface CodeLine {
  prefix: "$" | ">";
  content: React.ReactNode;
}

interface CodeBlockProps {
  lines: CodeLine[];
}

export const Keyword = ({ children }: { children: React.ReactNode }) => (
  <span className="text-purple-600 dark:text-purple-400">{children}</span>
);

export const Variable = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cyan-600 dark:text-cyan-400">{children}</span>
);

export const Property = ({ children }: { children: React.ReactNode }) => (
  <span className="text-orange-600 dark:text-orange-400">{children}</span>
);

export const StringLiteral = ({ children }: { children: React.ReactNode }) => (
  <span className="text-green-600 dark:text-green-400">{children}</span>
);

export const NumberLiteral = ({ children }: { children: React.ReactNode }) => (
  <span className="text-yellow-600 dark:text-yellow-400">{children}</span>
);

export const Comment = ({ children }: { children: React.ReactNode }) => (
  <span className="text-emerald-600 dark:text-emerald-400">{children}</span>
);

export const Type = ({ children }: { children: React.ReactNode }) => (
  <span className="text-yellow-600 dark:text-yellow-400">{children}</span>
);

export const Method = ({ children }: { children: React.ReactNode }) => (
  <span className="text-purple-600 dark:text-purple-400">{children}</span>
);

export function CodeBlock({ lines }: CodeBlockProps) {
  return (
    <div className="mockup-code mb-6 bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        {lines.map((line, index) => (
          <pre
            key={index}
            data-prefix={line.prefix}
            className={
              line.prefix === "$"
                ? "text-emerald-600 dark:text-emerald-400 font-medium text-sm"
                : "text-blue-600 dark:text-blue-300 text-sm"
            }
          >
            <code>{line.content}</code>
          </pre>
        ))}
      </div>
    </div>
  );
}