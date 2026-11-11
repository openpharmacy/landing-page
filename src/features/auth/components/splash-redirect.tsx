"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SPLASH_MS = 1500;

export function SplashRedirect({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace(href), SPLASH_MS);
    return () => clearTimeout(timer);
  }, [href, router]);

  return null;
}
