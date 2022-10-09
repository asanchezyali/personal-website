import Image from "next/future/image";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  blurDataURL?: string;
}

export default function CustomImage({
  src,
  alt,
  className,
  priority,
  blurDataURL,
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className={className}
      priority={priority}
      blurDataURL={blurDataURL}
    />
  );
}
