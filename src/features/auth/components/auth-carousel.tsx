"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// Figma sign-up split-hero left panel: a 3-slide carousel (gradient + faint
// circles + illustration + caption + dots). Illustrations are Figma exports.
const SLIDES = [
  {
    img: "/images/signup/signup-prescriptions-4b62cf.webp",
    title: "Your prescriptions, organized effortlessly.",
    subtitle:
      "Keep all your prescriptions in one place — clear, simple, and always accessible.",
  },
  {
    img: "/images/signup/signup-reminders-56d01b.webp",
    title: "Stay on track, every dose, every day.",
    subtitle:
      "Get gentle reminders and track your progress toward better health.",
  },
  {
    img: "/images/signup/signup-refill-4056fd.webp",
    title: "Refill in seconds, skip the line.",
    subtitle:
      "Order your medications directly from the app — quick, safe, and convenient.",
  },
];

const ROTATE_MS = 5000;

export function AuthCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active]!;

  return (
    <div className="relative h-full bg-gradient-hero">
      {/* Large circle bleeds past the right edge into the form (matches the photo hero). */}
      <span className="pointer-events-none absolute top-[210px] left-[-130px] size-[760px] rounded-full bg-primary-bright/20" />
      <span className="pointer-events-none absolute top-[339px] left-[321px] size-32 rounded-full bg-primary-500/20" />
      <span className="pointer-events-none absolute top-[179px] left-[222px] size-[77px] rounded-full bg-primary-500/20" />

      <div className="relative flex h-full flex-col justify-between py-12">
        {/* Cross-fading illustration */}
        <div className="relative flex-1">
          {SLIDES.map((s, i) => (
            <div
              key={s.img}
              className={cn(
                "absolute inset-0 flex items-center justify-center px-10 transition-opacity duration-700",
                i === active ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src={s.img}
                alt=""
                width={404}
                height={397}
                priority={i === 0}
                sizes="404px"
                className="w-[78%] max-w-[360px]"
              />
            </div>
          ))}
        </div>

        {/* Caption + dots */}
        <div className="flex flex-col items-center gap-9 px-12 text-center text-white">
          <div className="flex max-w-[342px] flex-col gap-2">
            <h2 className="text-h4-24">{slide.title}</h2>
            <p className="text-body-16 text-white/90">{slide.subtitle}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-1.5 rounded-full bg-white transition-all",
                  i === active ? "w-5" : "w-1.5 bg-white/40",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
