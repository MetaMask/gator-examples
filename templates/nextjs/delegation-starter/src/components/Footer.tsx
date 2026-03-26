import Image from "next/image";

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-start">
      <a
        href="https://docs.metamask.io/smart-accounts-kit/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
          className="flex-shrink-0"
        />
        Docs
      </a>
      <a
        href="https://github.com/metamask/gator-examples"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      >
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
          className="flex-shrink-0"
        />
        Examples
      </a>
    </footer>
  );
}