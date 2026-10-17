// /events — календарь ивентов участников (spec §4, §5). Факты: app — ивенты (статус разработки, п. 12),
// решение Ника 2026-10-16: вступление только через селфи с участником, QR ивента — для участников.
import type { Faq } from "@/components/faq";

export const eventsPage = {
  title: "Tech networking events — the 1handshake calendar",
  description: "Upcoming networking events for people in tech, hosted by members of 1handshake. Come to one, meet a member, take a selfie together — and you're in the club.",
  answer:
    "Upcoming networking events for people in tech, hosted by members of 1handshake. Anyone can come. If you're not a member yet, an event is the easiest way in: members are in the room, and a selfie with any of them gets you into the club.",
  getIn: [
    { n: "01", title: "pick an event", text: "Choose a date and a city below. If the host asks for registration, sign up on their page — the register link opens it." },
    { n: "02", title: "come and meet people", text: "The host is a member, and members come to these events. Say hi, talk, ask the host who else is in the club." },
    { n: "03", title: "selfie together", text: "A member takes a selfie with you. Their phone turns it into a one-time QR code that lives for 5 minutes." },
    { n: "04", title: "you're in", text: "Scan the code with your camera, sign in with Google and make your card. You and that member are connected 🤝." },
  ],
  members:
    "Members check in at the door with the host's QR code. Everyone who checked in shows up on each other's connect screen, so you can connect with the people you met in one tap — no mutual friends needed. A connection made there is a real meeting, just like a handshake.",
  hosts:
    "Any member can host an event from the app: a cover, a description, the date and place, a price and a link to your registration page. Already on Luma? Paste the link and the form fills itself. Once the event is approved, it appears in this calendar and in the members' feed. Registration and tickets stay wherever you keep them.",
  faq: [
    { q: "Do I need to be a member to come to an event?", a: "No. The events are open to anyone who registers with the host. Membership comes from meeting a member there: a selfie together gets you in." },
    { q: "Can I join 1handshake by scanning the event's QR code?", a: "No. The check-in code at the door is for members — it shows them everyone who came. Newcomers join the usual way, with a selfie with a member. At an event, members are right next to you." },
    { q: "Who hosts these events?", a: "Members of 1handshake. Any member can host an event from the app; it appears in the calendar after a quick review." },
    { q: "Are the events free?", a: "It depends on the host. The price is shown on each event; registration and tickets are on the host's own page." },
  ] satisfies Faq[],
};
