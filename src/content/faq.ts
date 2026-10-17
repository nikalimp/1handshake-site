// FAQ — spec §5 «/faq/». Факты: README, BACKLOG «Решение», app (privacy, README). Первые два вопроса — от Ника.
import type { Faq } from "@/components/faq";

export const faq: Faq[] = [
  { q: "What's the idea of 1handshake?", a: "LinkedIn is a network of business cards. 1handshake is a network of handshakes: it only connects people who actually met — every connection starts with a joint selfie — and you meet anyone else through a friend you share. Everyone you need is one handshake away." },
  { q: "What about privacy?", a: "Your card is public, so search engines and AI assistants can find you. Your connections are visible to members only while “open to network” is on, and your birthday is never shown to anyone. Data is stored in the EU, in Frankfurt, and you can export everything or delete your account from your profile." },
  { q: "How do I join 1handshake?", a: "Meet a member in person. You take a selfie together, their phone shows a one-time QR code that lives for 5 minutes, you scan it with your camera, sign in with Google, tell a bit about yourself and get your card." },
  { q: "Can I join without knowing a member?", a: "Not without meeting one. There is no sign-up form and no waitlist. The easiest way in is an event from the calendar at 1handshake.com/events: members host them and come to them, and a selfie with any member gets you in." },
  { q: "Is 1handshake free?", a: "Yes. There are no paid plans." },
  { q: "Who can see my profile?", a: "Your card at 1handshake.com/@you is public and indexed by search engines. With “open to hiring” on, members can see your profile and send you a request. Your offers are public too; only members can say they're interested in them." },
  { q: "What is a card and llms.txt?", a: "Your card is your page at 1handshake.com/@handle: name and role, city, a short markdown bio and links to your socials — like a link-in-bio page. The same card is available at /@handle/llms.txt, a plain-text version that AI assistants read." },
  { q: "What is an intro and a fire 🔥?", a: "An intro is a request to meet someone through the people you both know. Those mutual friends see the request and can back it with 🔥, so the person you want to meet sees who vouches for you. Requests with more fire come first." },
  { q: "What happens when I delete my account?", a: "Your personal data is erased and your card turns into a ghost 👻. The anonymous node stays in the graph, so intro chains that went through you don't break." },
  { q: "Where is my data stored?", a: "In a Postgres database and file storage in the EU, in Frankfurt. Photos are re-encoded on your device before upload, which removes location and camera metadata." },
  { q: "Is 1handshake open source?", a: "Yes. The code is public on GitHub under the AGPL-3.0 license: anyone can read and run it, and anyone who runs a modified version as a service has to share their changes too. Members' data is never part of the code." },
  { q: "How is 1handshake different from LinkedIn?", a: "On LinkedIn anyone can connect with anyone. On 1handshake every connection is a meeting that really happened, and you reach new people only through intros from mutual friends — there are no cold messages from strangers." },
  { q: "Why can I sign in only with Google?", a: "To keep the first version simple and secure. More ways to sign in are on the roadmap." },
  { q: "What are “open to hiring” and “open to network”?", a: "Two switches in your profile. “Open to hiring” lets members see your profile and send you requests. “Open to network” lets members see your connections; it works only together with “open to hiring”. Both are on by default." },
  { q: "Who builds 1handshake?", a: "1handshake is an independent open-source project built by @nikalimp. The code and the roadmap are public." },
  { q: "Is there a mobile app?", a: "1handshake is a web app designed for phones first. You can install it on your home screen as an app (PWA) — no app store needed." },
  { q: "What's next?", a: "Events are live: members host them, and the calendar is at 1handshake.com/events. Later come more sign-in options, an MCP connector for AI assistants, companies, groups and direct messages. Everything is on the public roadmap." },
];

export const homeFaq = faq.filter((_, i) => [0, 1, 2, 4, 10].includes(i));
