type SectionLabelProps = {
  /** Two-digit section marker, e.g. "01". */
  marker: string;
  children: React.ReactNode;
};

export function SectionLabel({ marker, children }: SectionLabelProps) {
  return (
    <p className="section-label">
      <span className="section-marker">{marker}</span>
      <span aria-hidden="true" className="section-label-divider">/</span>
      {children}
    </p>
  );
}
