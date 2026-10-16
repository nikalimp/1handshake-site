// llms.txt и llms-full.txt (llmstxt.org) — из того же контента, что и страницы.
import { site } from "@/content/site";
import { faq } from "@/content/faq";
import { how } from "@/content/how";
import { openSource } from "@/content/open-source";
import { roadmap } from "@/content/roadmap";
import { getPosts } from "./posts";

const plain = (s: string) => s.replace(/ /g, " ").replace(/⁠/g, "");

export function llmsTxt() {
  const posts = getPosts();
  return plain(`# ${site.name}

> ${site.description}

${site.name} is free and open source (AGPL-3.0). Members sign in at ${site.links.app}. Every member has a public card at ${site.url}/@handle with a plain-text version at ${site.url}/@handle/llms.txt.

## Pages
- [How it works](${site.url}/how-it-works/): ${how.answer}
- [FAQ](${site.url}/faq/): answers about joining, privacy, cards, intros and data.
- [Open code, closed data](${site.url}/open-source/): ${openSource.answer}
- [Roadmap](${site.url}/roadmap/): what is live, what comes next, what comes later.
${posts.length ? `\n## Blog\n${posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}/): ${p.description}`).join("\n")}\n` : ""}
## Links
- App: ${site.links.app}
- Code: ${site.links.github}
- Privacy: ${site.links.privacy}
- Full version for LLMs: ${site.url}/llms-full.txt
`);
}

export function llmsFullTxt() {
  const posts = getPosts().map((p) => `## ${p.title}\nURL: ${site.url}/blog/${p.slug}/\nDate: ${p.updated ?? p.date}\n\n${p.body}`);
  return plain(`${llmsTxt()}
---

# How it works

${how.answer}

${how.steps.map((s) => `${s.n}. ${s.title}: ${s.text}`).join("\n")}

---

# FAQ

${faq.map((f) => `## ${f.q}\n${f.a}`).join("\n\n")}

---

# Open code, closed data

${openSource.answer}

${openSource.rows.map((r) => `- ${r.k}: ${r.v}`).join("\n")}

---

# Roadmap

${roadmap.map((g) => `## ${g.title}\n${g.items.map((i) => `- ${i.title}: ${i.text}`).join("\n")}`).join("\n\n")}
${posts.length ? `\n---\n\n# Blog\n\n${posts.join("\n\n")}\n` : ""}`);
}
