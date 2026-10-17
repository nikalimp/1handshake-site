import Link from "next/link";
import { BadgeCheck, Code2, Flame, IdCard, ListChecks, Lock, Network, Sparkle, UserRound } from "lucide-react";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { how } from "@/content/how";
import { homeFaq } from "@/content/faq";
import { openSource } from "@/content/open-source";
import { formatDate, getPosts } from "@/lib/posts";
import { Container, Eyebrow, H2, Section } from "@/components/container";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { RingsGraph } from "@/components/rings-graph";
import { CardMock, IntroMock, InviteMock } from "@/components/mocks";
import { faqSchema, graph } from "@/lib/schema";
import { eventPath, getCalendar } from "@/lib/events";
import { dayLabel, placeLine, timeRange } from "@/lib/event-format";

const icons = { user: UserRound, flame: Flame, check: BadgeCheck, network: Network, card: IdCard, code: Code2, lock: Lock, list: ListChecks, circle: Sparkle } as const;

export default async function Home() {
  const s = home.sections;
  const posts = getPosts();
  const faqItems = [...homeFaq, ...home.extraFaq];
  const upcoming = s.events ? (await getCalendar()).events.filter((e) => !e.cancelled).slice(0, 3) : [];
  return (
    <>
      <JsonLd data={graph(faqSchema(faqItems))} />

      {/* Hero — B: точечная сетка, граф кольцами */}
      <section className="dot-grid border-b">
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col gap-6">
            <p className="meta text-muted-foreground">{site.tagline}</p>
            <h1 className="text-[56px] leading-[54px] font-extrabold tracking-[-0.04em] sm:text-[84px] sm:leading-[80px]">in connects<br />we trust</h1>
            <p className="max-w-[540px] text-[19px] leading-[29px] text-muted-foreground">{home.answer}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg"><a href={site.cta.href} data-event="sign_in_click">{site.cta.label}</a></Button>
              <Button asChild size="lg" variant="outline"><Link href="/how-it-works#get-in">how to get in</Link></Button>
            </div>
            <p className="meta text-muted-foreground">members only · no waitlist · open source</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <RingsGraph className="h-auto w-full max-w-[520px]" />
            <p className="w-full max-w-[420px] rounded-[14px] border bg-card px-4 py-3 text-[15px] leading-[21px]"><b>you</b> asked <b>anna</b> for an intro. she backed it 🔥</p>
          </div>
        </Container>
      </section>

      {/* Recent news — A */}
      {s.news && posts.length > 0 && (
        <section className="border-b bg-card">
          <Container className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5">
            <span className="meta text-brand">recent news</span>
            {posts.slice(0, 2).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="flex items-baseline gap-3 text-[15px] font-semibold hover:text-brand">
                {p.title}<span className="meta font-normal text-muted-foreground">{formatDate(p.date)}</span>
              </Link>
            ))}
          </Container>
        </section>
      )}

      {/* Events — the way in for people who don't know a member yet */}
      {s.events && (
        <Section className="border-b">
          <Container className="flex flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>don&apos;t know a member yet?</Eyebrow>
                <H2>come to an event</H2>
                <p className="mt-4 max-w-[620px] text-lg leading-7 text-muted-foreground">Members host meetups for people in tech. Come to one, meet a member, take a selfie together — and you&apos;re in.</p>
              </div>
              <Link href="/events" className="meta text-brand">all events →</Link>
            </div>
            {upcoming.length > 0 ? (
              <ul className="grid gap-4 md:grid-cols-3">
                {upcoming.map((e) => (
                  <li key={e.slug}>
                    <a href={eventPath(e.slug)} className="flex h-full flex-col overflow-hidden rounded-[28px] border bg-card hover:border-[var(--line-strong)]">
                      {e.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={e.cover_url} alt="" loading="lazy" width={400} height={400} className="aspect-[4/3] w-full object-cover" />
                      ) : (
                        <span className="dot-grid block aspect-[4/3] w-full bg-muted" />
                      )}
                      <span className="flex flex-col gap-1 p-5">
                        <span className="meta text-brand">{dayLabel(e.starts_at, e.timezone)} · {timeRange(e)}</span>
                        <span className="text-[19px] leading-6 font-bold">{e.title}</span>
                        <span className="truncate text-[15px] text-muted-foreground">{placeLine(e)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Link href="/events" className="rounded-[28px] border border-dashed px-6 py-10 text-center text-muted-foreground hover:text-foreground">the calendar fills up as members host events — see what&apos;s on →</Link>
            )}
          </Container>
        </Section>
      )}

      {/* How it works 01–04 — B */}
      {s.how && (
        <Section>
          <Container className="flex flex-col gap-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <H2>how it works</H2>
              <Link href="/how-it-works" className="meta text-brand">full walkthrough →</Link>
            </div>
            <ol className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {how.steps.map((st) => (
                <li key={st.n} className="flex flex-col gap-3 bg-background p-7">
                  <span className="meta text-brand">{st.n}</span>
                  <h3 className="text-[22px] font-bold">{st.title}</h3>
                  <p className="leading-6 text-muted-foreground">{st.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {/* C: get in · warm intros · your card */}
      {(s.getIn || s.intros || s.card) && (
        <section className="border-y bg-card">
          <Container className="flex flex-col gap-24 py-24">
            {s.getIn && (
              <div id="get-in" className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
                <div className="flex flex-col gap-4">
                  <Eyebrow className="mb-0">01 · get in</Eyebrow>
                  <H2>meet a member to get in</H2>
                  <p className="text-lg leading-7 text-muted-foreground">There is no sign-up form and no waitlist. A member takes a selfie with you; it becomes a QR code that works once and lives for 10 minutes. Scan it with your camera, tell about yourself, and AI drafts your card.</p>
                </div>
                <div className="flex justify-center"><InviteMock /></div>
              </div>
            )}
            {s.intros && (
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
                <div className="order-2 flex justify-center lg:order-1"><IntroMock /></div>
                <div className="order-1 flex flex-col gap-4 lg:order-2">
                  <Eyebrow className="mb-0">02 · warm intros</Eyebrow>
                  <H2>everyone is one handshake away</H2>
                  <p className="text-lg leading-7 text-muted-foreground">You see the people your connections know. Ask to meet someone, and the request goes through the friends you share. They can back it with 🔥 — no cold messages from strangers.</p>
                </div>
              </div>
            )}
            {s.card && (
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
                <div className="flex flex-col gap-4">
                  <Eyebrow className="mb-0">03 · your card</Eyebrow>
                  <H2>your card works everywhere</H2>
                  <p className="text-lg leading-7 text-muted-foreground">Your card is a public page at 1handshake.com/@you — like a link in bio, with your role, city, bio and socials. It has its own llms.txt, so search engines and AI assistants know who you are.</p>
                </div>
                <div className="flex justify-center"><CardMock /></div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Why 1handshake? — A */}
      {s.why && (
        <Section>
          <Container className="flex flex-col gap-14">
            <H2 className="text-center">why 1handshake?</H2>
            <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {home.why.map((w) => {
                const Icon = icons[w.icon as keyof typeof icons];
                return (
                  <li key={w.title} className="flex flex-col items-center gap-2.5 text-center">
                    <Icon className="size-7 text-brand" strokeWidth={2} aria-hidden="true" />
                    <h3 className="text-xl font-bold">{w.title}</h3>
                    <p className="max-w-[320px] leading-6 text-muted-foreground">{w.text}</p>
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>
      )}

      {/* Open code, closed data — B (таблица) + C (плитки) */}
      {s.data && (
        <section className="border-y">
          <Container className="grid gap-12 py-24 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-5">
              <H2>open code,<br />closed data</H2>
              <p className="text-lg leading-7 text-muted-foreground">The code is public. Members' data is not.</p>
              <div className="grid grid-cols-2 gap-3">
                {home.tiles.map((t) => (
                  <div key={t.k} className="rounded-[14px] border bg-card p-4">
                    <p className="meta text-muted-foreground">{t.k}</p>
                    <p className="mt-1.5 text-lg font-bold">{t.v}</p>
                  </div>
                ))}
              </div>
              <Link href="/open-source" className="font-semibold text-brand">open code, closed data →</Link>
            </div>
            <dl className="border-t">
              {openSource.rows.map((r) => (
                <div key={r.k} className="flex flex-col gap-1 border-b py-4 sm:flex-row sm:gap-6">
                  <dt className="meta w-32 flex-none pt-1 text-muted-foreground">{r.k}</dt>
                  <dd className="leading-6">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {/* Manifesto — A (всегда тёмная плашка) */}
      {s.manifesto && (
        <section className="dark bg-background text-foreground">
          <Container className="flex flex-col items-center gap-6 py-24 text-center">
            <span className="meta text-brand">manifesto</span>
            <p className="max-w-[760px] text-[26px] leading-[36px] font-bold tracking-[-0.02em] sm:text-[32px] sm:leading-[42px]">{home.manifesto.lead}</p>
            <p className="max-w-[680px] text-lg leading-[30px] text-muted-foreground sm:text-xl">{home.manifesto.body}</p>
            <p className="text-[22px] font-bold">{home.manifesto.end}</p>
          </Container>
        </section>
      )}

      {/* Blog — B */}
      {s.blog && posts.length > 0 && (
        <Section>
          <Container className="flex flex-col gap-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <H2>blog</H2>
              <Link href="/blog" className="meta text-brand">all posts →</Link>
            </div>
            <ul className="border-t">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug} className="border-b">
                  <Link href={`/blog/${p.slug}`} className="flex flex-col justify-between gap-1 py-5 text-xl font-bold hover:text-brand sm:flex-row sm:gap-6">
                    <span>{p.title}</span>
                    <span className="meta font-normal text-muted-foreground">{formatDate(p.date)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Google sign-in — требование проверки Google OAuth: зачем вход, какие данные, ссылка на Privacy Policy */}
      <Section className="border-t">
        <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.4fr] [&>*]:min-w-0">
          <div className="flex flex-col gap-4">
            <Eyebrow className="mb-0">sign in with google</Eyebrow>
            <H2>why we ask for google</H2>
          </div>
          <div className="flex flex-col gap-5 text-lg leading-8 text-muted-foreground">
            <p>1handshake uses Sign in with Google only to create your account and to sign you in. From Google we get your name and email address (and the link to your profile picture, if your account has one). We never see your password and get no access to your Gmail, Drive or contacts.</p>
            <p>Your email stays private — only you can see it. Read exactly what we keep and why in our <a href="/privacy" className="font-semibold text-brand underline underline-offset-4">Privacy Policy</a> and <a href="/terms" className="font-semibold text-brand underline underline-offset-4">Terms of Service</a>.</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild size="lg"><a href={site.cta.href} data-event="sign_in_click">open the app</a></Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ — A + C */}
      {s.faq && (
        <Section className="border-t">
          <Container className="flex max-w-[840px] flex-col gap-8">
            <H2 className="text-center">questions</H2>
            <FaqList items={faqItems} open={1} />
            <Link href="/faq" className="self-center font-semibold text-brand">all questions →</Link>
          </Container>
        </Section>
      )}
    </>
  );
}
