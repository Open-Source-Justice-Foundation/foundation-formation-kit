import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkDatabaseUrlType(): string {
  if (typeof process.env.DATABASE_URL === "string") {
    return process.env.DATABASE_URL;
  } else {
    throw new Error("Incorrect database URL type");
  }
}
