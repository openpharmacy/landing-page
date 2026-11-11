import type { ReactNode } from "react";

import { SUPPORT_EMAIL } from "@/features/help/data/support";

import { EmailLink } from "./email-link";

export function PolicyPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full px-4 pt-[17px] pb-[63px] lg:max-w-[572px] lg:pt-6 lg:pr-0 lg:pb-20 lg:pl-[2px]">
      <div className="flex flex-col gap-2 lg:gap-4">
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          {title}
        </h1>
        <p className="text-body-16 text-secondary-500">
          {children} If you have a question in the meantime, email us at{" "}
          <EmailLink email={SUPPORT_EMAIL} />.
        </p>
      </div>
    </div>
  );
}
