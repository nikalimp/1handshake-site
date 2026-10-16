// Знак 1h — монолинейный, из дизайн-системы бренда (Product/design-system/logo).
export function LogoMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 21 L23 15 L23 49" />
        <path d="M34 13 L34 49" />
        <path d="M34 33 C34 26.5 38.2 23 43.5 23 C48.8 23 52 26.5 52 33 L52 49" />
      </g>
    </svg>
  );
}
