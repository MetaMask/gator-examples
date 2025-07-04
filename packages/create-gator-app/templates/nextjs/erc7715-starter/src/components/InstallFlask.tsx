import React from "react";

export default function InstallFlask() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-600 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Install MetaMask Flask
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          This application requires MetaMask Flask to function. Follow the steps
          below to get started.
        </p>

        <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
          <li>
            <a
              href="https://metamask.io/flask/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 underline underline-offset-4 decoration-2 cursor-pointer"
            >
              Visit MetaMask Flask
            </a>{" "}
            and click the &ldquo;Install MetaMask Flask&rdquo; button in your
            browser
          </li>
          <li>Create a new wallet or import an existing account</li>
          <li>Switch to the correct network for this application</li>
        </ol>
      </div>
    </div>
  );
}
