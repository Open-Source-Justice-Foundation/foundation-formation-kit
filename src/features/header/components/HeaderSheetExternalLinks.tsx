import { SheetClose } from "~/components/ui/sheet";
import {
  HEADER_SHEET_ICON_BASE_SIZE,
  HEADER_SHEET_ICON_SMALL_SIZE,
} from "~/features/header/constants/constants";
import {
  FFK_DOCS_URL,
  FFK_GITHUB_URL,
  SUPPORT_EMAIL_URI,
} from "~/lib/auth/constants/constants";
import { BookText, Github, HandHelping } from "lucide-react";

export function HeaderSheetExternalLinks() {
  return (
    <>
      <SheetClose asChild>
        <a
          href={FFK_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex items-center justify-between text-sm min-[463px]:text-base">
            <span className="font-medium">Docs</span>
            <BookText
              size={HEADER_SHEET_ICON_SMALL_SIZE}
              className="hidden max-[462px]:block"
              aria-hidden="true"
            />
            <BookText
              size={HEADER_SHEET_ICON_BASE_SIZE}
              className="hidden min-[463px]:block"
              aria-hidden="true"
            />
            <span className="sr-only">{"Docs"}</span>
          </div>
        </a>
      </SheetClose>
      <SheetClose asChild>
        <a
          href={FFK_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex items-center justify-between text-sm min-[463px]:text-base">
            <span className="font-medium">GitHub</span>
            <Github
              size={HEADER_SHEET_ICON_SMALL_SIZE}
              className="hidden max-[462px]:block"
              aria-hidden="true"
            />
            <Github
              size={HEADER_SHEET_ICON_BASE_SIZE}
              className="hidden min-[463px]:block"
              aria-hidden="true"
            />
            <span className="sr-only">{"GitHub"}</span>
          </div>
        </a>
      </SheetClose>
      <SheetClose asChild>
        <a
          href={SUPPORT_EMAIL_URI}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
        >
          <div className="flex items-center justify-between text-sm min-[463px]:text-base">
            <span className="font-medium">Support</span>
            <HandHelping
              size={HEADER_SHEET_ICON_SMALL_SIZE}
              className="hidden max-[462px]:block"
              aria-hidden="true"
            />
            <HandHelping
              size={HEADER_SHEET_ICON_BASE_SIZE}
              className="hidden min-[463px]:block"
              aria-hidden="true"
            />
            <span className="sr-only">{"Support"}</span>
          </div>
        </a>
      </SheetClose>
    </>
  );
}
