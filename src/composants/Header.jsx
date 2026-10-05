import { useEffect, useState } from "react";
import { getTranslation, languages } from "../i18n.js";
import LocationPin from "./LocationPin.jsx";

export default function Header({ language = "FR", onLanguageChange = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const text = getTranslation(language);
  const closeMenu = () => setMenuOpen(false);
  const links = [
    [text.home, "/"],
    [text.history, "/maison"],
    [text.card, "/carte"],
    [text.contact, "/contact"],
  ];

  useEffect(() => {
    const openOrderPanel = () => setOrderOpen(true);
    window.addEventListener("chez-roger:open-order", openOrderPanel);
    return () => window.removeEventListener("chez-roger:open-order", openOrderPanel);
  }, []);

  useEffect(() => {
    if (!orderOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOrderOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [orderOpen]);

  function locateCustomer() {
    if (!navigator.geolocation) {
      setLocationStatus("La localisation n’est pas disponible sur cet appareil. Choisissez directement notre restaurant.");
      return;
    }
    setLocationStatus("Recherche de votre position…");
    navigator.geolocation.getCurrentPosition(
      () => setLocationStatus("Position détectée. Chez Roger Agoè Minamadou 2 est prêt à recevoir votre commande."),
      () => setLocationStatus("La localisation n’a pas abouti. Vous pouvez choisir directement notre restaurant."),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  }

  return (
    <>
    <header className="site-header">
      <a className="site-header__brand" href="/" aria-label="Chez Roger" onClick={closeMenu}>
        <img src="/logo-chez-roger-transparent.png" alt="Logo Chez Roger" />
      </a>
      <button
        className="site-header__toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="navigation-principale"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="navigation-principale"
        className={"site-header__nav" + (menuOpen ? " site-header__nav--open" : "")}
        aria-label="Main navigation"
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu}>{label}</a>
        ))}
        <div className="site-header__language">
          <button
            className="site-header__language-trigger"
            type="button"
            aria-label="Choose language"
            aria-expanded={languageOpen}
            aria-haspopup="true"
            onClick={() => setLanguageOpen((open) => !open)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" />
              <path d="M3.5 12h17M12 3c2.4 2.4 3.6 5.4 3.6 9s-1.2 6.6-3.6 9c-2.4-2.4-3.6-5.4-3.6-9S9.6 5.4 12 3Z" />
            </svg>
            <span>{language}</span>
            <svg className="site-header__language-chevron" aria-hidden="true" viewBox="0 0 12 12" fill="none">
              <path d="m2.25 4.5 3.75 3.25 3.75-3.25" />
            </svg>
          </button>
          {languageOpen && (
            <div className="site-header__language-options" role="menu" aria-label="Choose language">
              {languages.map(({ code, name }) => (
                <button
                  key={code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={language === code}
                  className={language === code ? "is-selected" : ""}
                  onClick={() => {
                    onLanguageChange(code);
                    setLanguageOpen(false);
                  }}
                >
                  <span>{name}</span><small>{code}</small>
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="button button--small button--orange" type="button" onClick={() => { closeMenu(); setOrderOpen(true); }}>{text.order}</button>
      </nav>
    </header>
    {orderOpen && (
      <div className="order-panel-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOrderOpen(false); }}>
        <aside className="order-panel" role="dialog" aria-modal="true" aria-labelledby="order-panel-title">
          <header className="order-panel__header">
            <div>
              <h2 id="order-panel-title">Commander</h2>
              <p>CHOISISSEZ VOTRE RESTAURANT</p>
            </div>
            <button className="order-panel__close" type="button" aria-label="Fermer" onClick={() => setOrderOpen(false)}>×</button>
          </header>
          <div className="order-panel__body">
            <section className="order-panel__locate">
              <p>Pour une commande rapide, localisez-vous ou choisissez notre restaurant.</p>
              <button type="button" onClick={locateCustomer}><LocationPin /> ME LOCALISER</button>
              {locationStatus && <p className="order-panel__status" role="status" aria-live="polite">{locationStatus}</p>}
            </section>
            <div className="order-panel__separator"><span>OU CHOISIR</span></div>
            <a className="order-panel__restaurant" href="https://wa.me/22899848110?text=Bonjour%20Chez%20Roger%2C%20je%20souhaite%20passer%20une%20commande%20%C3%A0%20Ago%C3%A8%20Minamadou%202." target="_blank" rel="noreferrer">
              <span><strong>Chez Roger · Agoè</strong><small>Minamadou 2, à côté de ESA</small></span>
              <span className="order-panel__arrow" aria-hidden="true">›</span>
            </a>
          </div>
        </aside>
      </div>
    )}
    </>
  );
}
