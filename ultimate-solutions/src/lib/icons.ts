import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Clapperboard,
  Code2,
  Layout,
  MonitorUp,
  MessagesSquare,
  Palette,
  Video,
} from "lucide-react";

export const ICONS = {
  palette: Palette,
  layout: Layout,
  code: Code2,
  clapperboard: Clapperboard,
  calendar: Calendar,
  video: Video,
  messages: MessagesSquare,
  meet: MonitorUp,
} as const satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

