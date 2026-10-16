import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6", className)} {...props} />;
}

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("py-20 sm:py-24", className)} {...props} />;
}

// Надпись над заголовком секции: моно, строчные, fire-ink
export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("meta mb-4 text-brand", className)} {...props} />;
}

export function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-[36px] leading-[40px] font-extrabold tracking-[-0.03em] sm:text-[44px] sm:leading-[46px]", className)} {...props} />;
}
