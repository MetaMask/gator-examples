import fileIcon from "@/assets/file.svg";
import windowIcon from "@/assets/window.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://docs.gator.metamask.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          aria-hidden
          src={fileIcon}
          alt="File icon"
          width={16}
          height={16}
        />
        Docs
      </a>
      <a
        href="https://github.com/metamask/gator-examples"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          aria-hidden
          src={windowIcon}
          alt="Window icon"
          width={16}
          height={16}
        />
        Examples
      </a>
    </footer>
  );
}
