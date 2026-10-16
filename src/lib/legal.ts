import fs from "node:fs";
import path from "node:path";

// Юридические тексты — дословно из 1handshake/Legal (content/legal/*.md). Не править при вёрстке.
export function legalDoc(name: "privacy" | "terms") {
  const raw = fs.readFileSync(path.join(process.cwd(), "content/legal", `${name}.md`), "utf8").trim();
  const m = raw.match(/^# (.+)\n+([\s\S]*)$/);
  return { title: m ? m[1] : name, body: m ? m[2] : raw };
}
