import type { Metadata } from "next";
import { legalDoc } from "@/lib/legal";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy · 1handshake" },
  description: "How 1handshake collects, uses and protects personal data: Google sign-in, visit cards, handshakes, AI features, service providers, retention and your rights.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  const d = legalDoc("privacy");
  return <LegalPage title={d.title} body={d.body} />;
}
