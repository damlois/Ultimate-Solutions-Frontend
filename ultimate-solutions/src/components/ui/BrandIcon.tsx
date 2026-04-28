import type { SimpleIcon } from "simple-icons";
import { siGooglemeet, siZoom } from "simple-icons";

type BrandIconName = "zoom" | "googlemeet";

const ICONS: Record<BrandIconName, SimpleIcon> = {
  zoom: siZoom,
  googlemeet: siGooglemeet,
};

export function BrandIcon({
  name,
  size = 22,
  className = "",
}: {
  name: BrandIconName;
  size?: number;
  className?: string;
}) {
  const icon = ICONS[name];
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
}

