"use client";
import { useState } from "react";
import { site } from "@/content/site";
import { Button } from "./ui/button";

type State = "idle" | "sending" | "sent" | "error";

const field = "w-full rounded-[14px] border border-line-strong bg-card px-4 py-3 text-[16px] leading-6 placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring";

export function IdeaForm() {
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return setState("sent"); // honeypot
    const idea = String(f.get("idea") ?? "").trim();
    if (idea.length < 3) return;
    setState("sending");
    try {
      const res = await fetch(site.ideas.endpoint, {
        method: "POST",
        headers: { apikey: site.ideas.key, Authorization: `Bearer ${site.ideas.key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({
          idea,
          name: String(f.get("name") ?? "").trim() || null,
          email: String(f.get("email") ?? "").trim() || null,
          page: document.referrer || null,
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent")
    return (
      <div className="rounded-[28px] border bg-card p-8">
        <p className="text-2xl font-extrabold tracking-[-0.02em]">thank you 🤝</p>
        <p className="mt-3 leading-7 text-muted-foreground">Your idea is in. We read every one, and the good ones end up on the <a href="/roadmap" className="font-semibold text-brand underline underline-offset-4">roadmap</a>.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="flex flex-col gap-5 rounded-[28px] border bg-card p-6 sm:p-8">
      <label className="flex flex-col gap-2">
        <span className="font-semibold">your idea</span>
        <textarea name="idea" required minLength={3} maxLength={4000} rows={6} className={field} placeholder="What should 1handshake do better, or do next?" />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-semibold">name <span className="font-normal text-muted-foreground">(optional)</span></span>
          <input name="name" maxLength={120} autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">email <span className="font-normal text-muted-foreground">(optional, if you'd like a reply)</span></span>
          <input name="email" type="email" maxLength={200} autoComplete="email" className={field} />
        </label>
      </div>
      <label className="hidden" aria-hidden="true">website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="text-sm leading-6 text-muted-foreground">We use what you send only to read and answer your idea. See our <a href="/privacy" className="underline underline-offset-4">Privacy Policy</a>.</p>
      {state === "error" && (
        <p role="alert" className="rounded-[14px] bg-accent px-4 py-3 text-sm text-brand">Couldn't send it right now. Please try again, or email it to <a href={`mailto:${site.links.email}`} className="font-semibold underline">{site.links.email}</a>.</p>
      )}
      <div>
        <Button type="submit" size="lg" disabled={state === "sending"}>{state === "sending" ? "sending…" : "send idea"}</Button>
      </div>
    </form>
  );
}
