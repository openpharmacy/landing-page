import type * as React from "react";

import { cn } from "@/lib/utils";

export function HelpPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full overflow-x-clip px-6 lg:max-w-[884px] lg:pt-6 lg:pr-0 lg:pb-20 lg:pl-[14px]",
        className,
      )}
      {...props}
    />
  );
}
