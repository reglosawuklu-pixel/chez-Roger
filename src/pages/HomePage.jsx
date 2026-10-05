import { useState } from "react";
import { getTranslation } from "../i18n.js";
import LocationPin from "../composants/LocationPin.jsx";
import { openOrderPanel } from "../composants/orderPanel.js";

const dishes = Array.from({ length: 8 }, (_, index) => ({
  number: index + 1,
  name: `Plat ${index + 1}`,
  image: `/plats/plat-${index + 1}.jpeg`,
}));

const menuCategories = [
  { name: "Spaghettis", items: [
    { name: "Spaghetti rouge", price: "1 000 FCFA" },
    { name: "Spaghetti blanc", price: "1 000 FCFA" },
    { name: "Spaghetti blanc crémeux", price: "1 500 FCFA" },
    { name: "Spaghetti rouge crémeux", price: "1 500 FCFA" },
    { name: "Spaghetti du chef", price: "2 000 FCFA" },
  ] },
  { name: "Attiéké", items: [
    { name: "Attiéké poisson", price: "1 000 FCFA" },
    { name: "Attiéké poisson", price: "1 500 FCFA" },
    { name: "Attiéké viande", price: "1 500 FCFA" },
    { name: "Attiéké poisson viande", price: "2 000 FCFA" },
  ] },
  { name: "Frites, alloco & poulet", items: [
    { name: "Frite au poulet", price: "1 500 FCFA / 2 000 FCFA" },
    { name: "Alloco au poulet", price: "1 500 FCFA / 2 000 FCFA" },
    { name: "Frite + alloco + poulet", price: "2 000 FCFA" },
    { name: "Poulet mayo", price: "2 000 FCFA" },
  ] },
  { name: "Couscous", items: [
    { name: "Couscous au saucisse", price: "1 000 FCFA" },
    { name: "Couscous + saucisse + œuf", price: "1 500 FCFA" },
    { name: "Couscous + saucisse + œuf + viande", price: "2 000 FCFA" },
  ] },
  { name: "Petit pois", items: [
    { name: "Petit pois au saucisse", price: "1 500 FCFA" },
    { name: "Petit pois au saucisse + viande", price: "2 000 FCFA" },
  ] },
  { name: "Boissons", items: [
    { name: "Canettes", price: "500 FCFA" },
  ] },
];

const contactCopy = {
  FR: {
    title: "Contactez-nous",
    intro: "Une question, une commande ou une suggestion ? Nous sommes là pour vous répondre.",
    formTitle: "Envoyez-nous un message",
    name: "Nom complet",
    email: "Email",
    subject: "Sujet",
    subjectHint: "Choisissez un sujet",
    subjects: ["Commande", "Réservation", "Livraison", "Question ou suggestion"],
    message: "Message",
    messageHint: "Écrivez votre message ici…",
    send: "Envoyer sur WhatsApp",
    locationTitle: "Nous trouver",
    location: "Agoè Minamadou, à côté de ESA, Lomé",
    phoneTitle: "Appelez-nous",
    emailTitle: "Email",
    hoursTitle: "Horaires",
    hours: "Du lundi au samedi : 09h00 à 21h30. Dimanche : 11h30 à 22h30.",
    note: "Votre message sera préparé dans WhatsApp afin que vous puissiez l’envoyer à Chez Roger.",
    notice: "WhatsApp va s’ouvrir avec votre message prêt à envoyer.",
  },
  EN: {
    title: "Contact us",
    intro: "A question, an order or a suggestion? We are here to help.",
    formTitle: "Send us a message",
    name: "Full name",
    email: "Email",
    subject: "Subject",
    subjectHint: "Choose a subject",
    subjects: ["Order", "Reservation", "Delivery", "Question or suggestion"],
    message: "Message",
    messageHint: "Write your message here…",
    send: "Send on WhatsApp",
    locationTitle: "Find us",
    location: "Agoè Minamadou, beside ESA, Lomé",
    phoneTitle: "Call us",
    emailTitle: "Email",
    hoursTitle: "Opening hours",
    hours: "Monday to Saturday: 09:00 to 21:30. Sunday: 11:30 to 22:30.",
    note: "Your message will be prepared in WhatsApp so you can send it to Chez Roger.",
    notice: "WhatsApp is opening with your message ready to send.",
  },
  DE: {
    title: "Kontaktieren Sie uns",
    intro: "Eine Frage, eine Bestellung oder ein Vorschlag? Wir helfen Ihnen gerne.",
    formTitle: "Schreiben Sie uns",
    name: "Vollständiger Name",
    email: "E-Mail",
    subject: "Betreff",
    subjectHint: "Betreff auswählen",
    subjects: ["Bestellung", "Reservierung", "Lieferung", "Frage oder Vorschlag"],
    message: "Nachricht",
    messageHint: "Schreiben Sie Ihre Nachricht…",
    send: "Über WhatsApp senden",
    locationTitle: "Unser Standort",
    location: "Agoè Minamadou, neben ESA, Lomé",
    phoneTitle: "Rufen Sie uns an",
    emailTitle: "E-Mail",
    hoursTitle: "Öffnungszeiten",
    hours: "Montag bis Samstag: 09:00 bis 21:30 Uhr. Sonntag: 11:30 bis 22:30 Uhr.",
    note: "Ihre Nachricht wird in WhatsApp vorbereitet, damit Sie sie an Chez Roger senden können.",
    notice: "WhatsApp öffnet sich mit Ihrer Nachricht.",
  },
  EE: {
    title: "Kpɔ mí",
    intro: "Nya aɖe, dɔwɔwɔ alo susu? Míele afi na wò.",
    formTitle: "Dɔ nuɖoɖo na mí",
    name: "Ŋkɔ blibo",
    email: "Email",
    subject: "Nya ta",
    subjectHint: "Tia nya ta",
    subjects: ["Dɔwɔwɔ", "Teƒe ɖoɖo", "Dɔɖiɖi", "Biaɖe alo susu"],
    message: "Nuɖoɖo",
    messageHint: "Ŋlɔ wò nuɖoɖo afisia…",
    send: "Dɔ ɖe WhatsApp dzi",
    locationTitle: "Kpɔ mí le afima",
    location: "Agoè Minamadou, ESA gbɔ, Lomé",
    phoneTitle: "Yɔ mí",
    emailTitle: "Email",
    hoursTitle: "Ɣeyiɣi si míewɔna dɔ",
    hours: "Dzoɖa va memleɖa: 09:00 va 21:30. Kɔsiɖa: 11:30 va 22:30.",
    note: "Woaɖo wò nuɖoɖo ɖe WhatsApp me be nàte ŋu aɖo eɖe Chez Roger.",
    notice: "WhatsApp le tsɔ geɖe be nàɖo wò nuɖoɖo.",
  },
  ZH: {
    title: "联系我们",
    intro: "有问题、想下单或提出建议？欢迎联系我们。",
    formTitle: "给我们留言",
    name: "姓名",
    email: "电子邮箱",
    subject: "主题",
    subjectHint: "请选择主题",
    subjects: ["点餐", "预订", "外送", "问题或建议"],
    message: "留言",
    messageHint: "请在这里填写留言…",
    send: "通过 WhatsApp 发送",
    locationTitle: "餐厅地址",
    location: "多哥洛美 Agoè Minamadou，ESA 旁边",
    phoneTitle: "致电我们",
    emailTitle: "电子邮箱",
    hoursTitle: "营业时间",
    hours: "周一至周六：09:00–21:30。周日：11:30–22:30。",
    note: "留言将在 WhatsApp 中准备好，您可以发送给 Chez Roger。",
    notice: "正在打开 WhatsApp，您的留言已准备好。",
  },
};

const storyCopy = {
  FR: {
    heroKicker: "Depuis les débuts à Agoè",
    heroTitle: "Notre histoire",
    heroIntro: "Tout a commencé avec peu de moyens, mais beaucoup d’envie.",
    firstKicker: "Une histoire vraie",
    firstTitle: "Tout a commencé sur le terrain d’Agoè.",
    firstParagraphs: [
      "Je suis partie de rien. Au départ, je n’avais presque aucun moyen, seulement l’envie de cuisiner et de faire plaisir.",
      "Je suis allée chez une amie avec qui je préparais de bons petits plats, simples et généreux, toujours faits avec le cœur. C’est dans cette petite baraque bleue, sur le terrain d’Agoè, que les premières assiettes ont été servies et que l’aventure a pris vie.",
      "Il n’y avait pas de grand restaurant ni de grands moyens. Il y avait l’entraide, le travail et la volonté de bien faire, un plat après l’autre. Cette baraque bleue est devenue le premier souvenir de l’histoire de Chez Roger.",
    ],
    timelineTitle: "Une aventure qui évolue, sans oublier ses débuts.",
    milestones: [
      { date: "17 octobre 2025", title: "Les bons p’tits plats", text: "L’aventure poursuit son chemin sous le nom Les bons p’tits plats." },
      { date: "09 juin", title: "Chez Roger", text: "Le nom change, mais l’envie de cuisiner avec cœur et de partager reste la même." },
    ],
    secondKicker: "Grandir pas à pas",
    secondTitle: "La petite baraque bleue, premier chapitre.",
    secondParagraphs: [
      "Avec le temps, les plats ont trouvé leur public. Des clients sont revenus, ont partagé leur expérience et fait connaître notre cuisine autour d’eux. Peu à peu, cette petite idée a grandi grâce à votre confiance.",
      "Les retours reçus font aussi partie de notre histoire. Ils nous encouragent à écouter, à améliorer nos plats et leurs emballages, et à continuer de progresser pour mieux vous satisfaire.",
    ],
    quote: "Une grande aventure peut naître d’un petit espace, d’une amitié et de l’envie de bien faire.",
    closingKicker: "L’aventure continue",
    closingTitle: "Aujourd’hui, Chez Roger poursuit son histoire.",
    closingText: "Derrière chaque assiette, nous gardons le même esprit que dans la baraque bleue : la passion de cuisiner, le goût du partage et l’envie de donner le meilleur.",
    thanksKicker: "Merci",
    thanksTitle: "Merci de faire partie de notre histoire.",
    thanksText: "Votre confiance, vos encouragements et chaque moment partagé nous poussent à aller de l’avant. Merci de faire vivre Chez Roger et de faire grandir cette aventure.",
    menu: "Découvrir la carte",
    photoAlt: "Un plat préparé et servi chez Roger",
  },
  EN: {
    heroKicker: "From the early days in Agoè",
    heroTitle: "Our story",
    heroIntro: "It began with very little, but with a great deal of determination.",
    firstKicker: "A true story",
    firstTitle: "It all began on the grounds of Agoè.",
    firstParagraphs: [
      "I started with nothing. At first, I had almost no resources, only the desire to cook and bring people joy.",
      "I went to stay with a friend, and together we made good, simple, generous meals with love. It was in that little blue kiosk, on the grounds of Agoè, that the first plates were served and the journey began.",
      "There was no big restaurant or large budget. There was mutual support, hard work, and the wish to do things well, one meal at a time. That blue kiosk became the first chapter in Chez Roger’s story.",
    ],
    timelineTitle: "A journey that grew while staying true to its roots.",
    milestones: [
      { date: "17 October 2025", title: "Les bons p’tits plats", text: "The journey continued under the name Les bons p’tits plats." },
      { date: "9 June", title: "Chez Roger", text: "The name changed, while the love of cooking and sharing stayed the same." },
    ],
    secondKicker: "Growing step by step",
    secondTitle: "The little blue kiosk was just the beginning.",
    secondParagraphs: [
      "Over time, people came to enjoy the food. Guests returned, shared their experience, and told others about our cooking. Little by little, your trust helped the idea grow.",
      "Your feedback is part of our story too. It encourages us to listen, improve our dishes and packaging, and keep working to serve you better.",
    ],
    quote: "A big journey can begin in a small place, with a friendship and the will to do things well.",
    closingKicker: "The journey continues",
    closingTitle: "Chez Roger is still writing its story.",
    closingText: "Behind every plate is the same spirit as in the blue kiosk: a love of cooking, sharing, and giving our best.",
    thanksKicker: "Thank you",
    thanksTitle: "Thank you for being part of our story.",
    thanksText: "Your trust, encouragement, and every moment shared inspire us to keep moving forward. Thank you for supporting Chez Roger and helping this journey grow.",
    menu: "Explore the menu",
    photoAlt: "A dish prepared and served at Chez Roger",
  },
  DE: {
    heroKicker: "Die Anfänge in Agoè",
    heroTitle: "Unsere Geschichte",
    heroIntro: "Alles begann mit wenig Geld, aber mit viel Leidenschaft.",
    firstKicker: "Eine wahre Geschichte",
    firstTitle: "Alles begann auf dem Gelände von Agoè.",
    firstParagraphs: [
      "Ich begann ganz von vorne. Anfangs hatte ich kaum Mittel, aber den Wunsch zu kochen und Menschen Freude zu bereiten.",
      "Ich ging zu einer Freundin, mit der ich einfache, großzügige Gerichte mit viel Herz zubereitete. In dieser kleinen blauen Hütte auf dem Gelände von Agoè wurden die ersten Teller serviert und das Abenteuer begann.",
      "Es gab kein großes Restaurant und kein großes Budget. Es gab gegenseitige Hilfe, harte Arbeit und den Wunsch, es gut zu machen – Gericht für Gericht. Die blaue Hütte wurde zum ersten Kapitel der Geschichte von Chez Roger.",
    ],
    timelineTitle: "Eine Entwicklung, die ihre Wurzeln bewahrt.",
    milestones: [
      { date: "17. Oktober 2025", title: "Les bons p’tits plats", text: "Das Projekt setzte seinen Weg unter dem Namen Les bons p’tits plats fort." },
      { date: "9. Juni", title: "Chez Roger", text: "Der Name änderte sich, die Freude am Kochen und Teilen blieb." },
    ],
    secondKicker: "Schritt für Schritt wachsen",
    secondTitle: "Die kleine blaue Hütte war erst der Anfang.",
    secondParagraphs: [
      "Mit der Zeit fanden die Gerichte ihre Gäste. Menschen kamen wieder, erzählten von ihren Erfahrungen und empfahlen unsere Küche weiter. Nach und nach wuchs die Idee dank Ihres Vertrauens.",
      "Auch Ihre Rückmeldungen gehören zu unserer Geschichte. Sie ermutigen uns zuzuhören, Gerichte und Verpackungen zu verbessern und Sie immer besser zu bewirten.",
    ],
    quote: "Ein großer Weg kann an einem kleinen Ort beginnen – mit Freundschaft und dem Wunsch, es gut zu machen.",
    closingKicker: "Die Reise geht weiter",
    closingTitle: "Chez Roger schreibt seine Geschichte weiter.",
    closingText: "Hinter jedem Teller steckt derselbe Geist wie in der blauen Hütte: die Freude am Kochen, Teilen und daran, unser Bestes zu geben.",
    thanksKicker: "Danke",
    thanksTitle: "Danke, dass Sie Teil unserer Geschichte sind.",
    thanksText: "Ihr Vertrauen, Ihre Unterstützung und die gemeinsamen Momente geben uns Kraft, weiterzumachen. Danke, dass Sie Chez Roger unterstützen und diese Geschichte mit uns wachsen lassen.",
    menu: "Speisekarte ansehen",
    photoAlt: "Ein bei Chez Roger zubereitetes und serviertes Gericht",
  },
  EE: {
    heroKicker: "Le Agoè ƒe gɔmedzedze",
    heroTitle: "Míaƒe ŋutinya",
    heroIntro: "Ewɔ dɔ gɔme kple nu sue, gake dziɖuɖu geɖe.",
    firstKicker: "Ŋutinya nyateƒe",
    firstTitle: "Nu siawo katã dze egɔme le Agoè.",
    firstParagraphs: [
      "Mede egɔme kple naneke o. Le gɔmedzedze me la, meɖo asi ɖe nu geɖe ŋu o, ke meɖe be mawɔ nuɖuɖu eye makpɔ dzidzɔ na amewo.",
      "Meyi nye xɔlɔ̃ aɖe gbɔ, eye míewɔ nuɖuɖu nyuitɔ, bɔbɔe eye wòdze dzi. Le agbo bluu sue ma me le Agoè la, míewɔ nuɖuɖu gbãtɔwo eye dɔa dze egɔme.",
      "Menye xɔ kɔkɔ aɖe alo ga geɖe o. Míele kpekpeɖeŋu, dɔwɔwɔ kple be míawɔ nu nyuie, nuɖuɖu ɖe nuɖuɖu dzi. Agbo bluu zu Chez Roger ƒe ŋutinya ƒe gɔmedzedze.",
    ],
    timelineTitle: "Dɔa trɔ, ke míebu míaƒe gɔmedzedze o.",
    milestones: [
      { date: "17 October 2025", title: "Les bons p’tits plats", text: "Dɔa yi edzi kple ŋkɔ Les bons p’tits plats." },
      { date: "09 June", title: "Chez Roger", text: "Ŋkɔa trɔ, ke dɔlɔlɔ kple nuɖuɖu le edzi." },
    ],
    secondKicker: "Tso sue me yi dzi",
    secondTitle: "Agbo bluu suea nye gɔmedzedze ko.",
    secondParagraphs: [
      "Le ɣeyiɣi me la, amewo va dɔ nuɖuɖuawo. Ame aɖewo gatrɔ va, gblɔ woƒe susu, eye yɔ amewo bubuwo va. Míeɖe ŋgɔ le miaƒe xɔse kple dzidzɔ me.",
      "Miaƒe susuwo hã le míaƒe ŋutinya me. Wokpena mí be míase woƒe nya, ado míaƒe nuɖuɖuwo nyuie, eye míakpɔ ɖe ŋgɔ na mi.",
    ],
    quote: "Dɔ gã aɖe ate ŋu adze egɔme le teƒe sue, kple xɔlɔ̃ kple be míawɔ nu nyuie.",
    closingKicker: "Dɔa yi edzi",
    closingTitle: "Chez Roger le ŋutinya yi edzi.",
    closingText: "Le nuɖuɖu ɖesiaɖe megbe la, míele nu same si le agbo bluu me: dɔlɔlɔ, nuɖuɖu kple be míana míaƒe nyui wu.",
    thanksKicker: "Akpe",
    thanksTitle: "Akpe be nèle míaƒe ŋutinya me.",
    thanksText: "Wò xɔse, kpekpeɖeŋu kple ɣeyiɣi si míedo go la nana míele ŋgɔ yim. Akpe be nèkpɔa Chez Roger eye nèkpema mí le dɔ sia me.",
    menu: "Kpɔ míaƒe nuɖuɖu",
    photoAlt: "Nuɖuɖu si wowɔ eye wòdɔ le Chez Roger",
  },
  ZH: {
    heroKicker: "从阿戈埃起步",
    heroTitle: "我们的故事",
    heroIntro: "一切从简陋的条件开始，却始终怀着热情。",
    firstKicker: "一个真实的故事",
    firstTitle: "故事始于阿戈埃的一块空地。",
    firstParagraphs: [
      "我从零开始。起初几乎没有任何资源，只有想要做饭、为大家带来快乐的心愿。",
      "我去了一位朋友那里，我们一起做简单、实在、用心的家常菜。就在阿戈埃那块地上的蓝色小棚子里，我们端出了第一份饭菜，这段旅程也由此开始。",
      "那时没有大餐厅，也没有充足的资金，只有彼此扶持、努力工作，以及一道菜一道菜把事情做好的决心。蓝色小棚子成为 Chez Roger 故事的第一页。",
    ],
    timelineTitle: "品牌不断成长，但始终记得初心。",
    milestones: [
      { date: "2025年10月17日", title: "Les bons p’tits plats", text: "这段事业以 Les bons p’tits plats 这个名字继续发展。" },
      { date: "6月9日", title: "Chez Roger", text: "品牌更名为 Chez Roger，对美食与分享的热爱始终如一。" },
    ],
    secondKicker: "一步一步成长",
    secondTitle: "蓝色小棚子只是第一章。",
    secondParagraphs: [
      "随着时间推移，越来越多人喜欢这里的菜。顾客再次光临、分享体验，也把我们的味道介绍给身边的人。因为大家的信任，这个小小的想法慢慢成长。",
      "顾客的反馈也是我们故事的一部分。它提醒我们认真倾听、改进菜品和包装，并继续努力，为大家带来更好的体验。",
    ],
    quote: "一段精彩的旅程，可以从一个小地方、一份友谊和认真做事的心开始。",
    closingKicker: "故事仍在继续",
    closingTitle: "Chez Roger 继续书写自己的故事。",
    closingText: "每一道菜都延续着蓝色小棚子里的初心：热爱烹饪、乐于分享，并尽力做到最好。",
    thanksKicker: "感谢",
    thanksTitle: "感谢您成为我们故事的一部分。",
    thanksText: "您的信任、鼓励和每一次相聚，都推动我们继续前进。感谢您支持 Chez Roger，陪伴这段旅程不断成长。",
    menu: "浏览菜单",
    photoAlt: "Chez Roger 用心制作并端上的一道菜",
  },
};

export default function HomePage({ page = "home", language = "FR" }) {
  const text = getTranslation(language);
  const contactText = contactCopy[language] || contactCopy.FR;
  const storyText = storyCopy[language] || storyCopy.FR;
  const [notice, setNotice] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [activeMenuCategory, setActiveMenuCategory] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);

  function handleReservation(event) {
    event.preventDefault();
    setNotice("Merci ! Le formulaire est prêt. La réservation en ligne sera activée lors du branchement au serveur.");
    event.currentTarget.reset();
  }

  function handleReview(event) {
    event.preventDefault();
    setNotice("Merci pour ton avis ! Son enregistrement sera activé avec la base de données.");
    event.currentTarget.reset();
    setReviewRating(0);
  }

  function handleContact(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const message = [
      `Bonjour Chez Roger, ${values.get("contact-subject")}.`,
      `Nom : ${values.get("contact-name")}`,
      `Email : ${values.get("contact-email")}`,
      `Message : ${values.get("contact-message")}`,
    ].join("\n");
    window.open(`https://wa.me/22899848110?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setNotice(contactText.notice);
  }

  return (
    <main data-page={page}>
      <section id="accueil" className="hero">
        <div className="hero__content">
          <p className="eyebrow"><span /> RESTAURANT · AGOÈ MINAMADOU <span /></p>
          <h1>{text.welcome}<br /><em>{language === "FR" ? "chez " : "Chez "}Roger.</em></h1>
          <p className="hero__description">{text.heroDescription}</p>
          <div className="hero__actions">
            <a className="button button--orange" href="/menu/carte">{text.seeMenu} <span aria-hidden="true">↗</span></a>
            <a className="hero__text-link" href="/commande" onClick={(event) => { event.preventDefault(); openOrderPanel(); }}>{text.order} <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero__categories">Cuisine togolaise <i /> Spaghettis <i /> Attiéké <i /> Grillades</p>
        </div>
        <div className="hero__visual">
          <img src="/plats/plat-5.jpeg" alt="Un plat généreux préparé Chez Roger" />
          <div className="hero__seal" aria-hidden="true"><span>CUISINE</span><strong>&amp;</strong><span>CONVIVIALITÉ</span></div>
          <span className="hero__visual-caption">Le plaisir de se retrouver à table</span>
        </div>
        <div className="hero__bottomline"><span>CHEZ ROGER</span><span>LE GOÛT DU PARTAGE</span></div>
      </section>
      <section className="welcome-strip" aria-label="À propos de notre cuisine">
        <span>Cuisine togolaise &amp; africaine</span><i />
        <span>Le goût du partage</span><i />
        <span>À Lomé</span>
      </section>

      <section id="maison" className="story-page">
        <header className="story-hero">
          <p className="story-hero__kicker">{storyText.heroKicker}</p>
          <h1>{storyText.heroTitle}</h1>
          <p className="story-hero__intro">{storyText.heroIntro}</p>
        </header>
        <section className="story-origin">
          <p className="eyebrow eyebrow--dark">{storyText.firstKicker}</p>
          <h2>{storyText.firstTitle}</h2>
          <div className="story-origin__copy">
            {storyText.firstParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
        <section className="story-timeline" aria-label={storyText.timelineTitle}>
          <h2>{storyText.timelineTitle}</h2>
          <div className="story-timeline__items">
            {storyText.milestones.map((milestone) => (
              <article className="story-timeline__item" key={milestone.date}>
                <p>{milestone.date}</p>
                <h3>{milestone.title}</h3>
                <span>{milestone.text}</span>
              </article>
            ))}
          </div>
        </section>
        <section className="story-growth">
          <div className="story-growth__photo">
            <img src="/histoire-chez-roger.jpeg" alt="La petite baraque bleue Chez Roger sur le terrain d’Agoè" loading="lazy" />
            <span>{storyText.firstKicker}</span>
          </div>
          <div className="story-growth__copy">
            <p className="eyebrow eyebrow--dark">{storyText.secondKicker}</p>
            <h2>{storyText.secondTitle}</h2>
            {storyText.secondParagraphs.map((paragraph) => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
        <blockquote className="story-quote">
          <span aria-hidden="true">“</span>
          <p>{storyText.quote}</p>
        </blockquote>
        <section className="story-closing">
          <p className="eyebrow eyebrow--dark">{storyText.closingKicker}</p>
          <h2>{storyText.closingTitle}</h2>
          <p className="body-copy">{storyText.closingText}</p>
          <a className="button button--dark" href="/carte">{storyText.menu} <span aria-hidden="true">↗</span></a>
        </section>
        <section className="story-thanks">
          <p className="eyebrow eyebrow--dark">{storyText.thanksKicker}</p>
          <h2>{storyText.thanksTitle}</h2>
          <p>{storyText.thanksText}</p>
          <img src="/logo-chez-roger-transparent.png" alt="Chez Roger" loading="lazy" />
        </section>
      </section>

      <section className="home-menu-banner">
        <div className="home-menu-banner__content">
          <p className="eyebrow"><span /> {text.explore} <span /></p>
          <h2>{text.menuTitle}</h2>
          <p>{text.menuTeaser}</p>
          <a className="button button--outline" href="/menu/carte">{text.menuButton} <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="home-menu-preview">
        <div className="home-menu-preview__copy">
          <p className="eyebrow"><span /> {text.menuTitle} · CHEZ ROGER <span /></p>
          <h2>{text.menuPreview}</h2>
          <p>{text.menuDescription}</p>
          <a className="button button--orange" href="/menu/carte">{text.seeMenu} <span aria-hidden="true">↗</span></a>
        </div>
        <a className="home-menu-preview__poster" href="/menu/carte" aria-label="Ouvrir le menu Chez Roger">
          <img src="/menu-chez-roger.jpeg" alt="Aperçu du menu officiel Chez Roger" loading="lazy" />
          <span>Voir le menu <span aria-hidden="true">↗</span></span>
        </a>
      </section>

      <section className="home-video">
        <div className="home-video__copy">
          <p className="eyebrow"><span /> PLONGE DANS L’UNIVERS CHEZ ROGER <span /></p>
          <h2>{text.videoTitle}</h2>
          <p>Découvre l’ambiance et les saveurs de Chez Roger en vidéo.</p>
        </div>
        <video controls playsInline preload="metadata" poster="/plats/plat-5.jpeg" aria-label="Vidéo de Chez Roger">
          <source src="/videos/roger-whatsapp.mp4" type="video/mp4" />
          Ton navigateur ne peut pas lire cette vidéo.
        </video>
      </section>

      <section className="home-gallery">
        <div className="home-gallery__heading">
          <div>
            <p className="eyebrow"><span /> LES SAVEURS EN IMAGE <span /></p>
            <h2>{text.galleryTitle}</h2>
          </div>
          <a className="text-link" href="/carte">Voir tous les plats <span aria-hidden="true">↗</span></a>
        </div>
        <div className="home-gallery__grid">
          {dishes.map((dish) => (
            <button className="home-gallery__photo" type="button" key={dish.number} aria-label={`Afficher le plat ${dish.number}`} onClick={() => setSelectedDish(dish)}>
              <img src={dish.image} alt={`Plat ${dish.number} de Chez Roger`} loading="lazy" />
              <span>Plat {dish.number} <span aria-hidden="true">↗</span></span>
            </button>
          ))}
        </div>
      </section>

      <section id="contact" className="home-contact">
        <div>
          <p className="eyebrow"><span /> {text.contact} · AGOÈ MINAMADOU <span /></p>
          <h2>{text.contactTitle}</h2>
          <p>{text.contactText}</p>
          <a className="home-contact__phone" href="tel:+22899848110">+228 99 84 81 10</a>
        </div>
        <div className="home-contact__actions">
          <a className="button button--orange" href="/commande" onClick={(event) => { event.preventDefault(); openOrderPanel(); }}>{text.order} <span aria-hidden="true">↗</span></a>
          <a className="button button--cream" href="/livraison">Découvrir la livraison <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="home-testimonial" aria-labelledby="home-testimonial-title">
        <span className="home-testimonial__quote" aria-hidden="true">“</span>
        <p className="eyebrow"><span /> {text.reviewTitle} <span /></p>
        <h2 id="home-testimonial-title">{text.testimonialTitle}</h2>
        <p>{text.testimonialText}</p>
        <a className="button button--outline" href="#avis">{text.reviewTitle} <span aria-hidden="true">↓</span></a>
        <p className="home-testimonial__note">Les témoignages seront publiés ici avec l’accord de nos clients.</p>
      </section>

      <section id="avis" className="review-section">
        <div className="review-section__heading">
          <p className="eyebrow eyebrow--dark">VOTRE AVIS</p>
          <h2>{text.reviewTitle}</h2>
          <p>{text.reviewText}</p>
        </div>
        <form className="review-form" onSubmit={handleReview}>
          <fieldset className="review-form__rating">
            <legend>{language === "EN" ? "Your rating" : language === "DE" ? "Ihre Bewertung" : language === "ZH" ? "您的评分" : language === "EE" ? "Wò dzidzɔ" : "Votre note"}</legend>
            <div className="review-form__stars" aria-label="Votre note sur cinq">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-pressed={reviewRating === star}
                  aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
                  className={reviewRating >= star ? "review-form__star is-selected" : "review-form__star"}
                  onClick={() => setReviewRating(star)}
                >★</button>
              ))}
            </div>
          </fieldset>
          <div className="review-form__row">
            <label>{text.name}<input name="review-name" type="text" placeholder={text.name} autoComplete="name" required /></label>
            <label>Email<input name="review-email" type="email" placeholder="Email" autoComplete="email" required /></label>
          </div>
          <label>Votre message<textarea name="review-message" placeholder="Racontez-nous votre expérience…" rows="4" required /></label>
          <button className="button button--dark" type="submit" disabled={reviewRating === 0}>{text.reviewSubmit} <span aria-hidden="true">↗</span></button>
          <p className="review-form__note">L’enregistrement des avis sera activé lors du branchement de la base de données.</p>
        </form>
      </section>

      <section className="contact-page">
        <header className="contact-page__heading">
          <h1>{contactText.title}</h1>
          <p>{contactText.intro}</p>
        </header>
        <div className="contact-page__layout">
          <form className="contact-form" onSubmit={handleContact}>
            <h2>{contactText.formTitle}</h2>
            <div className="contact-form__row">
              <label>{contactText.name}
                <input name="contact-name" type="text" placeholder={contactText.name} autoComplete="name" required />
              </label>
              <label>{contactText.email}
                <input name="contact-email" type="email" placeholder={contactText.email} autoComplete="email" required />
              </label>
            </div>
            <label>{contactText.subject}
              <select name="contact-subject" defaultValue="" required>
                <option value="" disabled>{contactText.subjectHint}</option>
                {contactText.subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
              </select>
            </label>
            <label>{contactText.message}
              <textarea name="contact-message" placeholder={contactText.messageHint} rows="6" required />
            </label>
            <button className="button button--orange" type="submit">{contactText.send} <span aria-hidden="true">↗</span></button>
            <p className="contact-form__note">{contactText.note}</p>
          </form>
          <aside className="contact-details">
            <section className="contact-details__group">
              <h2>{contactText.locationTitle}</h2>
              <p><LocationPin />{contactText.location}</p>
            </section>
            <section className="contact-details__group">
              <h2>{contactText.phoneTitle}</h2>
              <p><span aria-hidden="true">☎</span><a href="tel:+22899848110">+228 99 84 81 10</a></p>
              <p><svg className="contact-whatsapp-icon" viewBox="0 0 24 24" role="img" aria-label="WhatsApp"><path d="M20.5 11.8a8.3 8.3 0 0 1-12.3 7.3L4 20l.9-4a8.3 8.3 0 1 1 15.6-4.2Z" /><path d="M9 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4-.1.6.5.9 1.2 1.5 2 2 .2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .4-.2 1.2-.7 1.6-.5.5-1.2.7-1.9.6-1-.1-2.2-.7-3.4-1.7-1.6-1.3-2.6-2.9-2.9-4-.3-1.1.1-1.9.5-2.4Z" /></svg><a href="https://wa.me/22899848110" target="_blank" rel="noreferrer">WhatsApp · +228 99 84 81 10</a></p>
            </section>
            <section className="contact-details__group">
              <h2>{contactText.emailTitle}</h2>
              <p><span aria-hidden="true">✉</span><a href="mailto:contact@chezRogertogo.net">contact@chezRogertogo.net</a></p>
            </section>
            <section className="contact-details__group">
              <h2>{contactText.hoursTitle}</h2>
              <p><span aria-hidden="true">◷</span>{contactText.hours}</p>
            </section>
            <a className="contact-page__back" href="/">← {text.home}</a>
          </aside>
        </div>
      </section>

      <section className="commande-page info-page">
        <p className="eyebrow eyebrow--dark">CHEZ ROGER · AGOÈ MINAMADOU</p>
        <h2>{text.orderTitle}</h2>
        <p className="body-copy">{text.orderText}</p>
        <div className="commande-page__actions">
          <a className="button button--dark" href="/menu/carte">{text.seeMenu} <span aria-hidden="true">↗</span></a>
          <a className="button button--orange" href="tel:+22899848110">{text.call} <span aria-hidden="true">↗</span></a>
        </div>
        <p className="commande-page__address">Agoè Minamadou · À côté de ESA · Lomé</p>
      </section>      <section className="menu-directory info-page">
        <p className="eyebrow eyebrow--dark">CHEZ ROGER</p>
        <h2>Le menu<br /><em>de la maison.</em></h2>
        <p className="body-copy">Retrouve la carte officielle du restaurant avec ses plats et ses prix.</p>
        <a className="button button--dark menu-directory__button" href="/menu/carte">Voir le menu <span aria-hidden="true">↗</span></a>
      </section>

      <section className="menu-card-page" aria-label="Menu officiel Chez Roger">
        <img src="/menu-chez-roger.jpeg" alt="Carte officielle Chez Roger avec les plats et leurs prix" />
      </section>

      <section className="food-menu-page">
        <div className="food-menu-page__intro">
          <p className="eyebrow"><span /> {text.menuTitle} · CHEZ ROGER <span /></p>
          <h1>Nos plats<br /><em>à partager.</em></h1>
          <p>Choisis une catégorie pour découvrir les plats et les prix de Chez Roger.</p>
        </div>
        <nav className="food-menu-categories" aria-label="Catégories de plats">
          {menuCategories.map((category, index) => (
            <button
              key={category.name}
              type="button"
              className={activeMenuCategory === index ? "food-menu-categories__button is-active" : "food-menu-categories__button"}
              aria-pressed={activeMenuCategory === index}
              onClick={() => setActiveMenuCategory(index)}
            >
              {category.name}
            </button>
          ))}
        </nav>
        <section className="food-menu-list" aria-live="polite">
          <h2>{menuCategories[activeMenuCategory].name}</h2>
          {menuCategories[activeMenuCategory].items.map((item, index) => (
            <article className="food-menu-item" key={`${item.name}-${index}`}>
              <h3>{item.name}</h3>
              <span>{item.price}</span>
            </article>
          ))}
        </section>
        <p className="food-menu-page__note">Les canettes sont à 500 FCFA · Téléphone : +228 99 84 81 10</p>
        <a className="food-menu-page__image-link" href="/menu/carte-officielle">Voir la carte originale en image</a>
      </section>
      <section className="promotion-page info-page">
        <p className="eyebrow eyebrow--dark">LES BONS MOMENTS</p>
        <h2>Les promotions<br /><em>Chez Roger.</em></h2>
        <p className="body-copy">Les offres seront publiées ici dès que les promotions du restaurant seront confirmées.</p>
        <a className="button button--dark" href="/carte">Consulter la carte <span>↗</span></a>
      </section>

      <section className="delivery-page info-page">
        <p className="eyebrow eyebrow--dark">À VOTRE PORTE</p>
        <h2>La livraison<br /><em>Chez Roger.</em></h2>
        <p className="body-copy">Les modalités de livraison et les zones desservies seront précisées ici dès qu’elles seront confirmées par le restaurant.</p>
        <a className="button button--dark" href="/carte">Voir la carte <span>↗</span></a>
      </section>

      <section className="reservation-info info-page">
        <p className="eyebrow eyebrow--dark">VOTRE PROCHAINE BELLE TABLE</p>
        <h2>La réservation<br /><em>en toute simplicité.</em></h2>
        <p className="body-copy">Choisissez une date, une heure et le nombre de personnes. Envoyez ensuite votre demande de réservation.</p>
        <a className="button button--dark" href="/reserver-une-table">Réserver une table <span>↗</span></a>
      </section>
      <section id="carte" className="menu-section">
        <div className="section-kicker section-kicker--light"><span>02</span> <i /> LA CARTE</div>
        <div className="menu-section__heading">
          <div>
            <p className="eyebrow"><span /> À DÉCOUVRIR <span /></p>
            <h2>À chacun<br /><em>sa gourmandise.</em></h2>
          </div>
          <p className="menu-section__intro">
            Des premières bouchées aux douceurs de fin de repas, retrouvez les catégories de la carte Chez Roger.
          </p>
        </div>
        <div className="dish-grid">
          {dishes.map((dish) => (
            <button className="dish-card" type="button" key={dish.number} onClick={() => setSelectedDish(dish)}>
              <img src={dish.image} alt={dish.name} loading="lazy" />
              <span className="dish-card__label">{dish.name}</span>
              <span className="dish-card__hint">Voir le plat <span aria-hidden="true">↗</span></span>
            </button>
          ))}
        </div>
        <p className="menu-section__note">Clique sur une photo pour afficher le plat en grand. Les noms et prix officiels restent à compléter.</p>
      </section>

      <section id="reservation" className="reservation section-light">
        <div className="section-kicker"><span>03</span> <i /> RÉSERVATION</div>
        <div className="reservation__intro">
          <p className="eyebrow eyebrow--dark">VOTRE PROCHAINE BELLE TABLE</p>
          <h2>On vous garde<br /><em>une place ?</em></h2>
          <p className="body-copy">Indiquez-nous le moment souhaité et le nombre de personnes. Nous confirmerons la disponibilité avec vous.</p>
          <div className="reservation__location"><LocationPin /><span><strong>Agoè Minamadou</strong><small>À côté de ESA · Lomé</small></span></div>
        </div>
        <form className="reservation-form" onSubmit={handleReservation}>
          <div className="reservation-form__row">
            <label>Nom complet<input name="name" type="text" placeholder="Votre nom" autoComplete="name" required /></label>
            <label>Téléphone<input name="phone" type="tel" placeholder="Votre numéro" autoComplete="tel" required /></label>
          </div>
          <div className="reservation-form__row">
            <label>Date<input name="date" type="date" required /></label>
            <label>Heure<input name="time" type="time" required /></label>
          </div>
          <label>Nombre de personnes
            <select name="guests" defaultValue="2">
              <option value="1">1 personne</option><option value="2">2 personnes</option>
              <option value="3">3 personnes</option><option value="4">4 personnes</option>
              <option value="5">5 personnes</option><option value="6+">6 personnes ou plus</option>
            </select>
          </label>
          <button className="button button--dark" type="submit">Envoyer une demande <span aria-hidden="true">↗</span></button>
          <p className="reservation-form__fineprint">La demande sera connectée au système de réservation dans une prochaine étape.</p>
        </form>
      </section>

      {page === "confidentialite" || page === "remboursement" || page === "conditions" ? (
        <section className="info-page legal-page">
          <a className="legal-page__back" href="/contact">← RETOUR</a>
          {page === "confidentialite" ? (
            <>
              <h1>Politique de Confidentialité</h1>
              <article className="legal-page__content">
                <p>Chez Roger accorde une grande importance à la confidentialité de vos données. Cette politique explique quelles informations peuvent être utilisées lorsque vous consultez notre site ou nous contactez.</p>

                <h2>1. Informations recueillies</h2>
                <p>Lorsque vous remplissez le formulaire de contact, les informations que vous saisissez — nom, adresse e-mail, sujet et message — sont préparées dans WhatsApp afin que vous puissiez nous les envoyer. Elles ne sont transmises à Chez Roger que si vous choisissez d’envoyer le message.</p>
                <p>Les demandes de réservation saisies sur le site ne sont pas encore enregistrées ni transmises automatiquement. Pour réserver, contactez-nous directement.</p>

                <h2>2. Utilisation des informations</h2>
                <p>Les informations que vous nous envoyez servent uniquement à :</p>
                <ul>
                  <li>répondre à vos questions et suggestions ;</li>
                  <li>vous recontacter au sujet d’une commande ou d’une réservation ;</li>
                  <li>améliorer notre accueil et nos services.</li>
                </ul>
                <p>Nous n’utilisons pas ces informations pour vous envoyer des offres promotionnelles sans votre accord.</p>

                <h2>3. Partage et protection des données</h2>
                <p>Nous ne vendons pas vos informations personnelles. Si vous choisissez d’envoyer votre message par WhatsApp, son traitement dépend également des pratiques de confidentialité de WhatsApp. Consultez la <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noreferrer">politique de confidentialité de WhatsApp</a>.</p>
                <p>Nous limitons l’utilisation des informations reçues à la réponse à votre demande et prenons des précautions raisonnables pour en préserver la confidentialité.</p>

                <h2>4. Cookies et préférences</h2>
                <p>Le site enregistre votre choix de langue dans le stockage local de votre navigateur afin de le conserver lors de vos prochaines visites. Cette préférence reste sur votre appareil et peut être supprimée depuis les paramètres du navigateur.</p>

                <h2>5. Vos demandes et contact</h2>
                <p>Pour toute question concernant cette politique ou les informations que vous nous avez transmises, écrivez-nous à <a href="mailto:contact@chezRogertogo.net">contact@chezRogertogo.net</a>.</p>
              </article>
            </>
          ) : page === "remboursement" ? (
            <>
              <p className="eyebrow eyebrow--dark">RESTAURANT CHEZ ROGER</p>
              <h1>Politique de Remboursement</h1>
              <article className="legal-page__content">
                <p>Chez Roger fait tout son possible pour proposer des plats frais et de qualité et une expérience agréable. Comme les plats sont préparés pour chaque commande, une annulation ou un remboursement ne peut pas toujours être accordé une fois la préparation commencée ou la commande consommée. Cette politique s’applique sans limiter les droits prévus par la réglementation en vigueur.</p>

                <h2>1. Commandes et préparation</h2>
                <p>Dès qu’une commande est confirmée, sa préparation peut commencer. Contactez-nous dès que possible si vous souhaitez la modifier ou l’annuler. Une annulation ou un remboursement ne peut pas être garanti lorsque la préparation a commencé, sous réserve des droits qui vous sont applicables.</p>

                <h2>2. Remboursements</h2>
                <p>Un remboursement n’est pas automatique pour un plat commandé, préparé, consommé ou livré. Toutefois, si vous constatez un problème réel concernant votre commande, signalez-le à notre équipe sans tarder. Après vérification, nous étudierons la situation et vous proposerons une solution adaptée, conformément à la réglementation applicable.</p>

                <h2>3. Remplacement d’un plat</h2>
                <p>Lorsqu’un problème est confirmé par notre équipe, le plat concerné peut, selon le cas et la disponibilité, être remplacé par un produit équivalent ou faire l’objet d’une autre solution appropriée. Notre priorité est de trouver une issue respectueuse et satisfaisante pour le client.</p>

                <h2>4. Erreurs de commande</h2>
                <p>Si vous recevez un article différent de celui commandé, si un élément manque ou si une erreur provient de notre équipe, contactez-nous rapidement en indiquant votre commande. Nous vérifierons les faits et ferons le nécessaire pour corriger la situation dans les meilleurs délais.</p>

                <h2>5. Contact</h2>
                <p>Pour toute réclamation ou question concernant une commande, contactez notre équipe :</p>
                <ul>
                  <li>Téléphone / WhatsApp : <a href="https://wa.me/22899848110" target="_blank" rel="noreferrer">+228 99 84 81 10</a></li>
                  <li>E-mail : <a href="mailto:contact@chezRogertogo.net">contact@chezRogertogo.net</a></li>
                </ul>
              </article>
            </>
          ) : page === "conditions" ? (
            <>
              <h1>Termes &amp; Conditions</h1>
              <article className="legal-page__content">
                <p>En accédant au site Chez Roger, vous acceptez les présents termes et conditions. Ils décrivent les règles d’utilisation du site et les informations relatives aux demandes de contact, de réservation et de commande.</p>

                <h2>1. Utilisation du site</h2>
                <p>Le contenu du site est fourni à titre informatif et pour votre usage personnel. Nous faisons notre possible pour tenir les informations à jour, mais les plats, horaires, disponibilités et informations présentés peuvent évoluer. Chez Roger peut actualiser le site lorsque cela est nécessaire.</p>

                <h2>2. Réservations et commandes</h2>
                <p>Une demande de réservation ou de commande envoyée par le site ou par WhatsApp doit être confirmée par Chez Roger avant d’être considérée comme acceptée. Son exécution dépend notamment de la disponibilité des plats, des horaires et des contraintes de préparation ou de livraison. Si un élément n’est pas disponible, notre équipe vous contactera afin de convenir de la suite.</p>
                <p>Les demandes de réservation saisies dans le formulaire du site ne sont pas encore transmises automatiquement. Elles ne sont donc pas confirmées tant que notre équipe ne vous a pas répondu.</p>

                <h2>3. Propriété intellectuelle</h2>
                <p>Les textes, images, logos, éléments graphiques et la mise en page du site sont la propriété de Chez Roger ou utilisés avec autorisation. Toute reproduction ou réutilisation en dehors des exceptions prévues par la loi nécessite une autorisation préalable.</p>

                <h2>4. Informations et responsabilité</h2>
                <p>Nous nous efforçons de fournir des informations exactes et de maintenir le site accessible. Une interruption temporaire, une erreur ou une information devenue obsolète peut toutefois survenir. Contactez notre équipe pour vérifier un détail important avant de vous déplacer ou de passer commande. Cette section ne limite pas les droits que la réglementation applicable vous reconnaît.</p>

                <h2>5. Droit applicable et contact</h2>
                <p>Les présents termes sont interprétés conformément au droit applicable au Togo, sans priver le consommateur des protections impératives qui lui sont accordées. Pour toute question concernant le site ou une commande, contactez-nous :</p>
                <ul>
                  <li>Téléphone / WhatsApp : <a href="https://wa.me/22899848110" target="_blank" rel="noreferrer">+228 99 84 81 10</a></li>
                  <li>E-mail : <a href="mailto:contact@chezRogertogo.net">contact@chezRogertogo.net</a></li>
                </ul>
              </article>
            </>
          ) : (
            <>
              <p className="eyebrow eyebrow--dark">CHEZ ROGER · LOMÉ</p>
              <h2>{page === "remboursement" ? "Politique de Remboursement" : "Termes & Conditions"}</h2>
              <p className="body-copy">Cette page d’information est en cours de préparation. Pour toute question, contactez-nous à <a href="mailto:contact@chezRogertogo.net">contact@chezRogertogo.net</a>.</p>
              <a className="button button--dark" href="/contact">Nous contacter <span aria-hidden="true">↗</span></a>
            </>
          )}
        </section>
      ) : null}

      {selectedDish && (
        <div className="dish-modal" role="presentation" onClick={() => setSelectedDish(null)}>
          <div className="dish-modal__panel" role="dialog" aria-modal="true" aria-label={selectedDish.name} onClick={(event) => event.stopPropagation()}>
            <button className="dish-modal__close" type="button" aria-label="Fermer" onClick={() => setSelectedDish(null)}>×</button>
            <img className="dish-modal__image" src={selectedDish.image} alt={selectedDish.name} />
            <div className="dish-modal__caption">
              <p className="eyebrow"><span /> CHEZ ROGER <span /></p>
              <h2>{selectedDish.name}</h2>
              <p>Le nom et le prix de ce plat seront ajoutés à la carte officielle.</p>
            </div>
          </div>
        </div>
      )}
      <div className="notice" aria-live="polite" role="status">{notice}</div>
    </main>
  );
}









