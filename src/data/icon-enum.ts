import {
  Copy,
  Delete,
  EyeClosed,
  Link2,
  LogOut,
  Pencil,
  RefreshCcw,
  Share,
  ShieldUser,
  UserMinus,
} from "lucide-react";

export const ICONS = {
  link: Link2,
  out: LogOut,
  delete: Delete,
  edit: Pencil,
  copy: Copy,
  reactivate: RefreshCcw,
  admin: ShieldUser,
  demote: UserMinus,
  share: Share,
  eyeClosed: EyeClosed,
} as const;

export const ICONS_KEYS = {
  LINK: "link",
  OUT: "out",
  DELETE: "delete",
  EDIT: "edit",
  COPY: "copy",
  REACTIVATE: "reactivate",
  ADMIN: "admin",
  DEMOTE: "demote",
  SHARE: "share",
  EYE_CLOSED: "eyeClosed",
} as const;

export type IconType = keyof typeof ICONS;
