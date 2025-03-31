import { Link } from "react-router";

export const Footer = () => (
  <div className="flex lg:justify-between not-lg:flex-col w-full px-8 py-5 gap-10 not-lg:gap-4 text-app-color-light font-medium">
    <ul className="flex gap-10 not-lg:gap-4 not-lg:flex-col">
      <li>© Toorist 2025</li>
      <li className="underline">
        <Link to="/legal">Legal</Link>
      </li>
    </ul>
    <ul className="flex">
      <li>
        Made with love by{" "}
        <a
          href="https://github.com/gorvk"
          target="_blank"
          className="text-app-secondary-color underline"
        >
          @gorvk
        </a>
      </li>
    </ul>
  </div>
);
