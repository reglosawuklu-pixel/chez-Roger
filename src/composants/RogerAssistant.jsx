import { useEffect, useRef, useState } from "react";
import "./RogerAssistant.css";

const WHATSAPP_NUMBER = "22899848110";
const HOURS = "Du lundi au samedi, de 09h00 à 21h30. Le dimanche, de 11h30 à 22h30.";
const ADDRESS = "Agoè Minamadou 2, à côté de ESA, Lomé.";

const suggestions = ["Horaires", "Adresse", "La carte", "Commander", "Réserver"];

function makeReply(question) {
  const text = question.toLocaleLowerCase("fr");
  if (/horaire|ouvert|ferme|ouverture/.test(text)) return `Voici nos horaires : ${HOURS}`;
  if (/adresse|localisation|situe|trouver|venir/.test(text)) return `Nous sommes à ${ADDRESS}`;
  if (/carte|menu|plat|prix|tarif/.test(text)) return "Vous pouvez consulter la carte sur la page « La carte ». Les disponibilités et les prix sont confirmés par notre équipe au moment de la commande.";
  if (/livrai|livrer|livraison/.test(text)) return "Indiquez votre quartier et notre équipe vous confirmera la possibilité et les frais de livraison sur WhatsApp.";
  if (/contact|telephone|téléphone|whatsapp|appeler/.test(text)) return "Vous pouvez nous écrire ou nous appeler au +228 99 84 81 10.";
  if (/réserv|reserver|réserver|table|personne/.test(text)) return "Bien sûr. Choisissez « Réserver » et je prépare votre demande à envoyer à l’équipe Chez Roger.";
  if (/command|acheter|commander/.test(text)) return "Avec plaisir. Choisissez « Commander » pour préparer votre demande avec les détails utiles.";
  return "Je peux vous renseigner sur les horaires, l’adresse, la carte et la livraison, ou vous guider pour une commande ou une réservation. Pour les disponibilités, l’équipe vous répondra directement.";
}

export default function RogerAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "assistant", text: "Bonjour ! Je suis l’assistant Chez Roger. Comment puis-je vous aider ?" },
  ]);
  const [question, setQuestion] = useState("");
  const [flow, setFlow] = useState("");
  const [notice, setNotice] = useState("");
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (open && panelRef.current) panelRef.current.scrollTop = panelRef.current.scrollHeight;
  }, [messages, open, flow, notice]);

  function ask(value) {
    const choice = value.trim();
    if (!choice) return;
    setMessages((current) => [...current, { from: "user", text: choice }, { from: "assistant", text: makeReply(choice) }]);
    setQuestion("");
  }

  function startFlow(type) {
    const isReservation = type === "reservation";
    setFlow(type);
    setNotice("");
    setMessages((current) => [...current, {
      from: "assistant",
      text: isReservation
        ? "Je vous aide à préparer une demande de réservation. Remplissez les quelques informations ci-dessous. L’équipe vous confirmera la disponibilité."
        : "Je vous aide à préparer votre demande de commande. L’équipe confirmera les plats et leur disponibilité.",
    }]);
  }

  function submitRequest(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const isReservation = flow === "reservation";
    const lines = isReservation
      ? [
        "Bonjour Chez Roger, je souhaite demander une réservation.",
        `Nom : ${formData.get("name")}`,
        `Téléphone : ${formData.get("phone")}`,
        `Date : ${formData.get("date")}`,
        `Heure : ${formData.get("time")}`,
        `Nombre de personnes : ${formData.get("guests")}`,
        `Précision : ${formData.get("details") || "Aucune"}`,
      ]
      : [
        "Bonjour Chez Roger, je souhaite préparer une commande.",
        `Nom : ${formData.get("name")}`,
        `Téléphone : ${formData.get("phone")}`,
        `Plats et quantités : ${formData.get("items")}`,
        `Retrait ou livraison : ${formData.get("fulfillment")}`,
        `Adresse / quartier : ${formData.get("address") || "À préciser"}`,
        `Précision : ${formData.get("details") || "Aucune"}`,
      ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessages((current) => [...current, {
      from: "assistant",
      text: "Votre demande est prête dans WhatsApp. Elle sera envoyée à Chez Roger seulement si vous appuyez sur Envoyer. Cette première version ne conserve pas vos informations sur le site.",
    }]);
    setFlow("");
  }

  return (
    <>
      {open && (
        <section className="roger-assistant" role="dialog" aria-modal="false" aria-labelledby="roger-assistant-title">
          <header className="roger-assistant__header">
            <div className="roger-assistant__identity">
              <span className="roger-assistant__mark" aria-hidden="true">CR</span>
              <div><h2 id="roger-assistant-title">Assistant Chez Roger</h2><p>À votre service à Lomé</p></div>
            </div>
            <button className="roger-assistant__close" type="button" aria-label="Fermer l’assistant" onClick={() => setOpen(false)}>×</button>
          </header>

          <div className="roger-assistant__messages" ref={panelRef} aria-live="polite">
            {messages.map((message, index) => <p key={`${index}-${message.from}`} className={`roger-assistant__message roger-assistant__message--${message.from}`}>{message.text}</p>)}
            {!flow && <div className="roger-assistant__suggestions" aria-label="Questions fréquentes">
              {suggestions.map((item) => <button key={item} type="button" onClick={() => {
                if (item === "Commander") startFlow("order");
                else if (item === "Réserver") startFlow("reservation");
                else ask(item);
              }}>{item}</button>)}
            </div>}
            {flow && (
              <form className="roger-assistant__form" onSubmit={submitRequest}>
                <label>Votre nom<input name="name" autoComplete="name" required maxLength="100" /></label>
                <label>Téléphone<input name="phone" type="tel" autoComplete="tel" required maxLength="30" /></label>
                {flow === "reservation" ? <>
                  <label>Date souhaitée<input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} /></label>
                  <div className="roger-assistant__form-row">
                    <label>Heure<input name="time" type="time" required /></label>
                    <label>Personnes<input name="guests" type="number" min="1" max="30" required /></label>
                  </div>
                  <label>Précision (facultatif)<textarea name="details" rows="2" maxLength="300" /></label>
                </> : <>
                  <label>Plats et quantités<textarea name="items" rows="2" required maxLength="500" placeholder="Ex. riz gras × 2" /></label>
                  <label>Retrait ou livraison<select name="fulfillment" defaultValue="À préciser" required><option>À préciser</option><option>Retrait sur place</option><option>Livraison</option></select></label>
                  <label>Adresse ou quartier (facultatif)<input name="address" autoComplete="street-address" maxLength="180" /></label>
                  <label>Précision (facultatif)<textarea name="details" rows="2" maxLength="300" /></label>
                </>}
                <button className="roger-assistant__submit" type="submit">Continuer sur WhatsApp</button>
                {notice && <p className="roger-assistant__notice" role="status">{notice}</p>}
                <p className="roger-assistant__privacy">Vos informations ne sont pas enregistrées par le site dans cette version.</p>
              </form>
            )}
          </div>

          {!flow && <form className="roger-assistant__composer" onSubmit={(event) => { event.preventDefault(); ask(question); }}>
            <input ref={inputRef} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Écrivez votre question…" aria-label="Votre question" maxLength="300" />
            <button type="submit" aria-label="Envoyer la question" disabled={!question.trim()}>Envoyer</button>
          </form>}
          <p className="roger-assistant__disclaimer">Assistant guidé · Vos commandes restent à confirmer par l’équipe.</p>
        </section>
      )}
      <button className={`roger-assistant__launcher${open ? " roger-assistant__launcher--open" : ""}`} type="button" aria-label={open ? "Fermer l’assistant Chez Roger" : "Ouvrir l’assistant Chez Roger"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <span aria-hidden="true">×</span> : <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L4 20l1.1-4A8.4 8.4 0 1 1 20.5 11.6Z"/><path d="M9 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.2.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.5 2 2 .2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1.1-.7 1.5-.5.5-1.1.7-1.8.6-1-.1-2.1-.7-3.3-1.7-1.5-1.3-2.5-2.8-2.8-3.9-.3-1 .1-1.8.5-2.3Z"/></svg>}
      </button>
    </>
  );
}
