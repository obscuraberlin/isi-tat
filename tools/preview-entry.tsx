/**
 * Einstiegspunkt fuer das Vorschau-Bundle (eine HTML-Datei zum Ansehen).
 * Nutzt exakt dieselben Komponenten wie die Seite — nur client-gerendert,
 * damit die Vorschau ohne Server und ohne Next-Laufzeit laeuft.
 * Produktionsstand bleibt der statische Export in out/.
 */
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/app/globals.css";
import { TrailerProvider } from "../src/components/TrailerModal/TrailerContext";
import Page from "../src/app/page";
import LoginPage from "../src/app/login/page";

function Preview() {
  const [route, setRoute] = useState(() =>
    typeof location !== "undefined" && location.hash === "#login"
      ? "login"
      : "home",
  );

  useEffect(() => {
    const sync = () => setRoute(location.hash === "#login" ? "login" : "home");
    window.addEventListener("hashchange", sync);

    /* In der Vorschau gibt es keinen Router: Links auf /login und / werden
       auf die Hash-Navigation umgebogen. */
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href === "/login") {
        event.preventDefault();
        location.hash = "#login";
        window.scrollTo(0, 0);
      } else if (href === "/") {
        event.preventDefault();
        location.hash = "";
        window.scrollTo(0, 0);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", onClick);
    };
  }, []);

  if (route === "login") return <LoginPage />;

  return (
    <TrailerProvider>
      <Page />
    </TrailerProvider>
  );
}

const host = document.getElementById("root");
if (host) createRoot(host).render(<Preview />);
