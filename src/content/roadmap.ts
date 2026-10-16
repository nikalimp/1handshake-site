// Roadmap — из BACKLOG.md (вне репозитория), без 🗄, монетизации (10.9) и непринятых идей Claude (10.11).
// Рекрутмент (6.4) — в later по решению Ника 2026-10-16. При изменении бэклога обновлять этот файл.
export type RoadmapItem = { title: string; text: string };

export const roadmap: { id: "live" | "next" | "later"; title: string; lead: string; items: RoadmapItem[] }[] = [
  {
    id: "live",
    title: "live",
    lead: "Working today at app.1handshake.com.",
    items: [
      { title: "Invite by a joint selfie", text: "A member takes a selfie with you; it becomes a one-time QR code that lives for 5 minutes." },
      { title: "Handshakes between members", text: "Two members who meet scan each other's code and get 🤝 right away." },
      { title: "Google sign-in", text: "Members sign in with Google." },
      { title: "AI card from your voice", text: "Tell about yourself by voice or text; AI drafts your card in markdown, and you edit it." },
      { title: "Public card with llms.txt", text: "Your page at 1handshake.com/@handle with a plain-text version for AI assistants." },
      { title: "Social links", text: "Telegram, LinkedIn, X, GitHub and others on your card." },
      { title: "Connect", text: "People one handshake away, best matches first; connect or skip." },
      { title: "Intros with 🔥", text: "Requests go through mutual friends, who can back them with fire." },
      { title: "I need · i can + AI matching", text: "Up to five needs and five offers each; matches are marked and shown first." },
      { title: "Feed and wall", text: "Incoming requests, events in your circle, and a wall on every profile." },
      { title: "Graph", text: "Your network on one screen, filtered by city and sphere." },
      { title: "Open to hiring · open to network", text: "Two switches for who sees your profile and your connections." },
      { title: "Export and delete", text: "Download your data as JSON or delete your account; you become a ghost 👻." },
      { title: "Reports and moderation", text: "Three reports on a fake selfie hide it until a moderator decides." },
      { title: "Install as an app", text: "Add 1handshake to your home screen (PWA), light and dark theme." },
    ],
  },
  {
    id: "next",
    title: "next",
    lead: "The first update after launch.",
    items: [
      { title: "Events", text: "An event page with date and place; all guests land in one graph." },
      { title: "One QR code for all guests", text: "An organizer shows the code on screen and everyone joins." },
      { title: "Organizer invite links", text: "Organizers invite their guests with their own link." },
    ],
  },
  {
    id: "later",
    title: "later",
    lead: "Ideas we plan to build, in no fixed order.",
    items: [
      { title: "More ways to sign in", text: "GitHub, email and others." },
      { title: "MCP connector", text: "Use your network from Claude, ChatGPT and other assistants." },
      { title: "Direct messages", text: "Talk inside 1handshake instead of other apps." },
      { title: "Groups", text: "Shared spaces for people with a common topic." },
      { title: "Companies", text: "Company pages with their members, needs and offers." },
      { title: "Check-ins", text: "Mark the city you're in and meet people you know there." },
      { title: "Birthdays", text: "Congratulate your connections with one tap." },
      { title: "Per-connection access", text: "Choose who sees each of your connections." },
      { title: "Recruitment", text: "Tools for hiring among members who are open to it." },
      { title: "Invite and intro limits", text: "Limits that protect members from spam." },
      { title: "More languages", text: "The interface starts in English; other languages come later." },
    ],
  },
];
