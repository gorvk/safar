import { Outlet, Scripts } from "react-router";

import "./supabase/index.ts";
import "../src/index.css";
export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Easy to share itineraries for your upcoming trips."
        />
        <title>Toorist</title>
        <link rel="shortcut icon" href="#" />
      </head>

      <body className="bg-white font-sans">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
