// Мокапы интерфейса app с примером данных (design §2.1, секции C). Подпись «example» — данные не настоящие.

export function InviteMock() {
  return (
    <div className="w-[300px] max-w-full rounded-[28px] border bg-background p-6 flex flex-col items-center gap-4" aria-label="Example of an invite QR code">
      <div className="relative grid size-[220px] place-items-center rounded-[14px] bg-[repeating-conic-gradient(var(--foreground)_0_25%,var(--card)_0_50%)] bg-[length:22px_22px]">
        <div className="meta grid size-[84px] place-items-center rounded-[14px] border-4 border-card bg-secondary text-muted-foreground">selfie</div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary"><div className="h-1.5 w-[62%] rounded-full bg-primary" /></div>
      <span className="meta text-muted-foreground">code lives 03:06 · example</span>
    </div>
  );
}

export function IntroMock() {
  return (
    <div className="w-[380px] max-w-full rounded-[14px] border bg-card p-4 shadow-[var(--shadow-card)] flex flex-col gap-3" aria-label="Example of an intro request">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-secondary font-bold">m</span>
        <p className="text-[15px] leading-[21px]"><b>max</b> wants to meet you<br /><span className="meta text-muted-foreground">2nd · via anna · example</span></p>
      </div>
      <div className="rounded-lg bg-accent px-3 py-2 text-[13px] font-medium text-brand">🔥 anna backed this</div>
      <div className="flex gap-2">
        <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">connect</span>
        <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-secondary font-semibold">skip</span>
      </div>
    </div>
  );
}

export function CardMock() {
  return (
    <div className="w-[400px] max-w-full rounded-[28px] border bg-card p-7 shadow-[var(--shadow-card)] flex flex-col gap-4" aria-label="Example of a public card">
      <div className="flex items-center justify-between"><span className="meta text-muted-foreground">1handshake.com/@anna</span><span className="meta text-muted-foreground">example</span></div>
      <div className="meta grid size-[88px] place-items-center rounded-full bg-secondary text-muted-foreground">photo</div>
      <p className="text-[28px] leading-8 font-extrabold tracking-[-0.02em]">anna kim <span className="font-semibold text-muted-foreground">— product designer</span></p>
      <span className="meta text-muted-foreground">@anna · tbilisi · design · 🤝 12</span>
      <p className="leading-6">Designs tools for founders. Runs a monthly design crit.</p>
      <div className="flex flex-col gap-1.5 rounded-[14px] border p-4">
        <span className="meta w-fit rounded-full bg-secondary px-2.5 py-1">service</span>
        <p className="font-bold">Design crit for your onboarding</p>
        <span className="meta text-muted-foreground">i'm interested · members</span>
      </div>
      <div className="meta whitespace-pre-line rounded-lg border border-dashed border-line-strong bg-background p-3 leading-[18px] text-muted-foreground">{"# anna kim — product designer\ncard: 1handshake.com/@anna\ncity: tbilisi"}</div>
    </div>
  );
}
