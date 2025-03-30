import { Link } from "react-router-dom";

export const Footer = () => (
  <div className="flex justify-between w-full px-8 py-5 text-app-color-light font-medium">
    <ul className="flex gap-10">
      <li>© Toorist 2025</li>
      <li className="underline">
        <Link to="/legal">Legal</Link>
      </li>
    </ul>
    <ul className="flex gap-10">
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
