import type { LucideIcon } from "lucide-react";

export function IconBadge({
  icon: Icon,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={[
        "h-10 w-10 rounded-2xl bg-ultimate-purple/10 border border-ultimate-purple/20",
        "grid place-items-center text-ultimate-purple",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}

