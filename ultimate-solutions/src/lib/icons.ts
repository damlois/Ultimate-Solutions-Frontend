import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Clapperboard,
  Code2,
  Layout,
  MonitorUp,
  MessagesSquare,
  Palette,
  Share2,
  Video,
} from "lucide-react";

export const ICONS = {
  palette: Palette,
  layout: Layout,
  code: Code2,
  clapperboard: Clapperboard,
  share: Share2,
  calendar: Calendar,
  video: Video,
  messages: MessagesSquare,
  meet: MonitorUp,
} as const satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

