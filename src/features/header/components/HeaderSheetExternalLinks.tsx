import { HEADER_SHEET_ICON_BASE_SIZE } from "~/features/header/constants/constants";
import {
  FFK_DOCS_URL,
  FFK_GITHUB_URL,
  SUPPORT_EMAIL_URI,
} from "~/lib/auth/constants/constants";
import { BookText, Github, HandHelping } from "lucide-react";

export function HeaderSheetExternalLinks() {
  return (
    <>
      <a
        href={FFK_DOCS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
      >
        <div className="flex items-center gap-2 text-base">
          <BookText size={HEADER_SHEET_ICON_BASE_SIZE} aria-hidden="true" />
          <span className="sr-only">{"Docs"}</span>
          <span className="font-medium">Docs</span>
        </div>
      </a>
      <a
        href={SUPPORT_EMAIL_URI}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
      >
        <div className="flex items-center gap-2 text-base">
          <HandHelping size={HEADER_SHEET_ICON_BASE_SIZE} aria-hidden="true" />
          <span className="sr-only">{"Support"}</span>
          <span className="font-medium">Support</span>
        </div>
      </a>
      <a
        href={FFK_GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
      >
        <div className="flex items-center gap-2 text-base">
          <Github size={HEADER_SHEET_ICON_BASE_SIZE} aria-hidden="true" />
          <span className="sr-only">{"GitHub"}</span>
          <span className="font-medium">GitHub</span>
        </div>
      </a>
    </>
  );
}
