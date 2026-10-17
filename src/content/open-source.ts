// /open-source/ — манифест «open code, closed data». Факты: app/README.md, app/src/app/privacy.
export const openSource = {
  answer:
    "The code of 1handshake is public on GitHub under the AGPL-3.0 license. Members' data is not: it is stored in the EU, only what you choose is visible, and you can export or delete it at any time.",
  rows: [
    { k: "license", v: "AGPL-3.0. Anyone can read and run the code; if you run a modified version as a service, you share your changes too." },
    { k: "what we keep", v: "Your Google account email, your card (name, role, bio, photo, city), your birthday (only you see it), your handshakes and requests, and the joint selfie from your invite." },
    { k: "where", v: "A Postgres database and file storage in the EU, in Frankfurt. Photos are re-encoded on your device before upload, which removes location and camera metadata." },
    { k: "public", v: "Your card at 1handshake.com/@you with your offers, and its llms.txt." },
    { k: "members only", v: "Who is interested in your offers (you see it); your connections — only while “open to network” is on." },
    { k: "never shown", v: "Your birthday — it stays visible only to you." },
    { k: "your rights", v: "Export everything as JSON or delete your account from your profile. Deletion erases your personal data; an anonymous ghost 👻 node stays so intro chains don't break." },
  ],
};
