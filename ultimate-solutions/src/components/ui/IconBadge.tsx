import type { LucideIcon } from "lucide-react";

const COLOR_VARIANTS = {
  purple: "bg-ultimate-purple/10 border-ultimate-purple/20 text-ultimate-purple",
  fuchsia: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-600",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-600",
  amber: "bg-amber-500/10 border-amber-500/20 text-amber-600",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
} as const;

export type IconBadgeColor = keyof typeof COLOR_VARIANTS;

export function IconBadge({
  icon: Icon,
  color = "purple",
  className = "",
}: {
  icon: LucideIcon;
  color?: IconBadgeColor;
  className?: string;
}) {
  return (
    <div
      className={[
        "h-11 w-11 rounded-2xl border",
        "grid place-items-center",
        COLOR_VARIANTS[color],
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}
