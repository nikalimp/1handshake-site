// /hosts — лендинг для организаторов (spec §4, §5). Факты: ивенты в app (статус разработки, п. 12),
// решения Ника 2026-10-16: хост — участник, вступление только через селфи с участником, оплату клуб не принимает.
// Цифр аудитории нет — не пишем.
import type { Faq } from "@/components/faq";

export const hostsPage = {
  title: "Host a networking event with 1handshake",
  description: "Host your meetup on 1handshake: it goes into the club's calendar and feed, members check in with your QR code and connect with everyone who came. Free.",
  answer:
    "Host your meetup on 1handshake and it goes into the club's calendar at 1handshake.com/events and into the members' feed. At the door, members check in with your QR code and see everyone who came, so the connections made in the room don't scatter after it. It's free, and registration stays wherever you keep it.",
  why: [
    { icon: "calendar", title: "seen by the club", text: "Your event goes into the public calendar at 1handshake.com/events and into the feed of every member, with your cover, date, place and price." },
    { icon: "users", title: "people stay connected", text: "Everyone who checks in sees everyone else who came. Members connect in one tap, without mutual friends — the meeting is enough." },
    { icon: "check", title: "real connections only", text: "Check-in works only at the venue, around the event's time. Every connection made there stands for two people who were in the same room." },
    { icon: "door", title: "a reason to come", text: "For people who aren't members yet, an event is the way in: they meet a member, take a selfie together and join the club." },
    { icon: "ticket", title: "your registration stays yours", text: "Keep your page on Luma, Eventbrite or anywhere else: we show the price as you write it and link to your registration. 1handshake takes no payments and no fees." },
    { icon: "chart", title: "going and checked in", text: "Each event shows how many people plan to come and how many checked in at the door." },
  ],
  steps: [
    { n: "01", title: "be a member", text: "Hosts are members of 1handshake. Not one yet? Come to any event in the calendar and meet a member there." },
    { n: "02", title: "create the event", text: "In the app, tap “host event”: add a cover, a description, the date and place, a price and your registration link. Already on Luma? Paste the link and the form fills itself." },
    { n: "03", title: "quick review", text: "Your connections see the event in their feed right away. After a short review it appears in the public calendar and its check-in starts working." },
    { n: "04", title: "show the qr at the door", text: "Open the check-in QR in the app, show it on your phone or print it. It works from 3 hours before the start until 3 hours after the end; if a photo of it leaks, make a new one." },
    { n: "05", title: "everyone stays in touch", text: "Members who checked in find each other on their connect screen after the event and connect in one tap." },
  ],
  faq: [
    { q: "Do I have to be a member to host?", a: "Yes. Any member can host an event from the app. If you're not a member yet, come to an event from the calendar and meet one — a selfie together gets you in." },
    { q: "How much does it cost?", a: "Nothing. Hosting is free, and 1handshake takes no payments or fees: tickets, if any, stay on your own registration page." },
    { q: "Can guests join the club by scanning my QR code?", a: "No. The check-in code is for members — it shows them everyone who came. Newcomers join the usual way: a selfie with a member. At your event, members are right there." },
    { q: "Can I change or cancel the event?", a: "Yes. Edit it or cancel it from the event page in the app; the calendar updates on its own." },
    { q: "Which events fit?", a: "Anything where people in tech meet in person: meetups, talks, breakfasts, workshops, walks. Online events can be listed too." },
  ] satisfies Faq[],
};
