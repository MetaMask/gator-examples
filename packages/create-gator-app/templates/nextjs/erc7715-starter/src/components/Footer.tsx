import { File, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700/30 py-6 mt-auto">
      <div className="max-w-4xl mx-auto px-6 flex justify-center space-x-8">
        <a
          href="https://docs.metamask.io/delegation-toolkit/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover:underline hover:underline-offset-4"
        >
          <File className="h-4 w-4" />
          <span>Docs</span>
        </a>
        <a
          href="https://github.com/metamask/create-gator-app-cli"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 hover:underline hover:underline-offset-4"
        >
          <Code2 className="h-4 w-4" />
          <span>Examples</span>
        </a>
      </div>
    </footer>
  );
}
