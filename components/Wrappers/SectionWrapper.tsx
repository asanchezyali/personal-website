interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ children, className }: SectionWrapperProps) {
  return (
    <div className={className}>
      <div className="mx-auto max-w-3xl md:max-w-5xl px-4 md:px-6 xl:max-w-5xl xl:px-0">
        {children}
      </div>
    </div>
  );
}