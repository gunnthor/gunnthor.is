type SectionLabelProps = {
  /** Two-digit section marker, e.g. "01". */
  marker: string;
  children: React.ReactNode;
};

export function SectionLabel({ marker, children }: SectionLabelProps) {
  return (
    <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-faint">
      <span className="text-signal">{marker}</span>
      <span aria-hidden="true" className="h-px w-8 bg-line-bright" />
      {children}
    </p>
  );
}
