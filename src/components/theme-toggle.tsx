"use client";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const d = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("theme", d ? "dark" : "light"); } catch {}
  }
  return (
    <button onClick={toggle} aria-label="switch theme" className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
      <Sun className="size-5 dark:hidden" strokeWidth={2} />
      <Moon className="hidden size-5 dark:block" strokeWidth={2} />
    </button>
  );
}
