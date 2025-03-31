import { Outlet, Scripts } from "react-router";
import "./supabase/index.ts";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Easy to share itineraries for your upcoming trips."
        />
        <title>Tooristt</title>
        <link rel="shortcut icon" href="#" />
      </head>

      <body className="bg-white font-sans">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}
