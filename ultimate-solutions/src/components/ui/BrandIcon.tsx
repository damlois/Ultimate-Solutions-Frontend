import type { SimpleIcon } from "simple-icons";
import { siFacebook, siGooglemeet, siInstagram, siTiktok, siX, siZoom } from "simple-icons";

type BrandIconName =
  | "zoom"
  | "googlemeet"
  | "instagram"
  | "facebook"
  | "x"
  | "tiktok"
  | "linkedin";

// simple-icons no longer ships a LinkedIn mark, so it's defined manually here
// in the same { title, path, hex } shape as the rest of the icon set.
const LINKEDIN: SimpleIcon = {
  title: "LinkedIn",
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  hex: "0A66C2",
} as SimpleIcon;

const ICONS: Record<BrandIconName, SimpleIcon> = {
  zoom: siZoom,
  googlemeet: siGooglemeet,
  instagram: siInstagram,
  facebook: siFacebook,
  x: siX,
  tiktok: siTiktok,
  linkedin: LINKEDIN,
};

export function BrandIcon({
  name,
  size = 22,
  className = "",
  monochrome = false,
}: {
  name: BrandIconName;
  size?: number;
  className?: string;
  monochrome?: boolean;
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
      <path d={icon.path} fill={monochrome ? "currentColor" : `#${icon.hex}`} />
    </svg>
  );
}

