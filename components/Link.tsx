import Link from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function CustomLink({ href, children, onClick, className }: LinkProps) {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a className={className} onClick={onClick}>{children}</a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
