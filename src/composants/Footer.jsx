import { getTranslation } from "../i18n.js";
import LocationPin from "./LocationPin.jsx";
import { openOrderPanel } from "./orderPanel.js";

export default function Footer({ language = "FR" }) {
  const text = getTranslation(language);
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__about">
          <a className="site-footer__brand" href="/" aria-label="Chez Roger">
            <img src="/logo-chez-roger-loader.png" alt="Chez Roger" />
          </a>
          <p className="site-footer__motto">{language === "EN" ? <>Authentic taste,<br />extra satisfaction!</> : language === "DE" ? <>Authentischer Geschmack,<br />noch mehr Genuss!</> : language === "ZH" ? <>地道风味，<br />更多满足！</> : language === "EE" ? <>Nuɖuɖu nyuie,<br />dzidzɔ kple mía!</> : <>Le goût authentique,<br />la satisfaction en plus !</>}</p>
          <nav className="site-footer__legal" aria-label="Informations légales">
            <a href="/contact">Contact</a>
            <a href="/confidentialite">Politique de Confidentialité</a>
            <a href="/remboursement">Politique de Remboursement</a>
            <a href="/conditions">Termes &amp; Conditions</a>
          </nav>
        </div>
        <div className="site-footer__contact">
          <h2>CHEZ ROGER · LOMÉ</h2>
          <p><LocationPin /> Agoè Minamadou 2<small>{text.location}</small></p>
          <a href="tel:+22899848110"><span aria-hidden="true">☎</span> +228 99 84 81 10</a>
        </div>
        <nav className="site-footer__links" aria-label={text.footerExplore}>
          <h2>{text.footerExplore}</h2>
          <a href="/">{text.home}</a>
          <a href="/menu">{text.menuTitle}</a>
          <a href="/carte">{text.card}</a>
          <a href="/commande" onClick={(event) => { event.preventDefault(); openOrderPanel(); }}>{text.order}</a>
          <a href="/livraison">{language === "EN" ? "Delivery" : language === "DE" ? "Lieferung" : language === "ZH" ? "配送" : language === "EE" ? "Dɔ̌ nú" : "Livraison"}</a>
        </nav>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} CHEZ ROGER. {text.footerRights}</p>
        <p className="site-footer__developer">{language === "EN" ? "Developed by" : language === "DE" ? "Entwickelt von" : language === "ZH" ? "开发者" : language === "EE" ? "Wɔe" : "Développé par"} <strong>AWUKLU K. Régis</strong></p>
      </div>
    </footer>
  );
}
