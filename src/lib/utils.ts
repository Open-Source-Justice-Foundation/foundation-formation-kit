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

// Dates
export function isDate(value: unknown): boolean {
  if (
    Object.prototype.toString.call(value) === "[object Date]" &&
    value instanceof Date
  ) {
    if (!isNaN(value.getTime())) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const month = date.toLocaleString("default", { month: "long" });

  const dayOfMonth = date.getDate();

  const year = date.getFullYear();

  const formattedDate = `${month}, ${dayOfMonth} ${year}`;

  return formattedDate;
}
