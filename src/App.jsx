import { useEffect, useState } from "react";
import Header from "./composants/Header.jsx";
import Footer from "./composants/Footer.jsx";
import RogerAssistant from "./composants/RogerAssistant.jsx";
import HomePage from "./pages/HomePage.jsx";
import { languages } from "./i18n.js";
import "./App.css";

function pageFromPath(pathname) {
  const path = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const routes = {
    "/maison": "maison",
    "/menu": "menu",
    "/menu/carte": "menu-carte",
    "/menu/carte-officielle": "menu-image",
    "/carte": "carte",
    "/contact": "contact",
    "/confidentialite": "confidentialite",
    "/remboursement": "remboursement",
    "/conditions": "conditions",
    "/reservation": "reservation",
    "/promotion": "promotion",
    "/livraison": "livraison",
    "/reserver-une-table": "reserver",
    "/commande": "commande",
  };
  return routes[path] || "home";
}

export default function App() {
  const maintenanceMode = false;
  const [page] = useState(() => pageFromPath(window.location.pathname));
  const [language, setLanguage] = useState(() => {
    try {
      const savedLanguage = window.localStorage.getItem("chez-roger-language");
      return languages.some(({ code }) => code === savedLanguage) ? savedLanguage : "FR";
    } catch {
      return "FR";
    }
  });
  const [loading, setLoading] = useState(true);

  function handleLanguageChange(nextLanguage) {
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem("chez-roger-language", nextLanguage);
    } catch {
      // The language still changes for this visit if browser storage is unavailable.
    }
  }

  useEffect(() => {
    if (!loading) return undefined;
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [loading]);

  return (
    <>
      <div className={maintenanceMode ? "site-content site-content--blurred" : "site-content"} aria-hidden={maintenanceMode}>
        {page !== "menu-image" && <Header language={language} onLanguageChange={handleLanguageChange} />}
        <HomePage page={page} language={language} />
        {page !== "menu-image" && <Footer language={language} />}
      </div>
      {maintenanceMode && (
        <div className="site-maintenance" role="status" aria-live="polite">
          <div className="site-maintenance__card">
            <img src="/logo-chez-roger-transparent.png" alt="Chez Roger" />
            <p className="site-maintenance__eyebrow">CHEZ ROGER · LOMÉ</p>
            <h1>Site en maintenance</h1>
            <p>Nous préparons le site. Revenez bientôt découvrir Chez Roger.</p>
          </div>
        </div>
      )}
      {loading && (
        <div className="site-loader" role="status" aria-label="Chargement de Chez Roger">
          <img src="/logo-chez-roger-loader.png" alt="Chez Roger" />
          <div className="site-loader__track" aria-hidden="true"><span /></div>
        </div>
      )}
      {page !== "menu-image" && <RogerAssistant />}
    </>
  );
}
