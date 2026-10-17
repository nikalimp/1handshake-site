// Главная — design §2.1: все секции A, B, C; лишнее Ник выключит флагом в `sections` (код не удаляем).
export const home = {
  answer:
    "1handshake is a members-only network for people in tech. You get in only by meeting a member in person — a joint selfie becomes a one-time invite — and every intro comes through someone you both know.",
  sections: {
    news: true,
    events: true,
    how: true,
    getIn: true,
    intros: true,
    card: true,
    why: true,
    data: true,
    manifesto: true,
    blog: true,
    faq: true,
  },
  why: [
    { icon: "user", title: "real", text: "You join only by meeting a member, with a selfie to prove it." },
    { icon: "flame", title: "warm", text: "Every intro comes through someone you both know. They can back it with 🔥." },
    { icon: "check", title: "verified", text: "Each connection in the graph is a meeting that really happened." },
    { icon: "network", title: "one handshake away", text: "See who your connections know, and ask them for an intro." },
    { icon: "card", title: "your card", text: "A public page at 1handshake.com/@you, with llms.txt for search and AI." },
    { icon: "code", title: "open code", text: "The code is public on GitHub under AGPL-3.0." },
    { icon: "lock", title: "closed data", text: "Your data lives in the EU. Export it or delete your account any time." },
    { icon: "list", title: "offers", text: "Post an order, a project, a product or a service; members say they're interested." },
    { icon: "circle", title: "free", text: "No paid plans. Once you're in, sign in with Google." },
  ],
  manifesto: {
    lead: "LinkedIn made networking cold. Strangers in your inbox. Connections you never met. A feed of humblebrags.",
    body: "We're building it back warm. You get in only by meeting a member — in person, with a selfie to prove it. Every intro comes through someone you both know. Your card is yours. The code is open. Your data isn't.",
    end: "Everyone you need is one handshake away.",
  },
  tiles: [
    { k: "license", v: "agpl-3.0" },
    { k: "data", v: "eu · frankfurt" },
    { k: "price", v: "free" },
    { k: "leave", v: "export · delete" },
  ],
  extraFaq: [
    { q: "No one I know is a member?", a: "Then come to an event from the calendar at 1handshake.com/events. Members host them and come to them — a selfie with any of them gets you in." },
  ],
};
