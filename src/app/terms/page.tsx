import type { Metadata } from "next";
import { legalDoc } from "@/lib/legal";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service · 1handshake" },
  description: "The terms for using 1handshake: who can join, your card and content, real handshakes, community rules, moderation, AI features, liability and contact.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  const d = legalDoc("terms");
  return <LegalPage title={d.title} body={d.body} />;
}
