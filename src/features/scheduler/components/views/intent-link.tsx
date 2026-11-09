"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

type Props = Omit<
  ComponentProps<typeof Link>,
  "prefetch" | "onPointerEnter" | "onFocus" | "onTouchStart"
>;

export function IntentLink(props: Props) {
  const [intent, setIntent] = useState(false);
  const show = () => setIntent(true);
  return (
    <Link
      {...props}
      prefetch={intent ? null : false}
      onPointerEnter={show}
      onFocus={show}
      onTouchStart={show}
    />
  );
}
