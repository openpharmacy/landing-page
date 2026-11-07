import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: "/icons/feature-scripts.svg",
    title: "All your scripts in one place",
    desc: "eScrips, pharmacy records, and treatment details in one clear view.",
  },
  {
    icon: "/icons/feature-refill.svg",
    title: "Refill on time, \nevery time",
    desc: "Smart reminders help you reorder before you run out. No last-minute stress.",
  },
  {
    icon: "/icons/feature-dose.svg",
    title: "Never \nmiss a dose",
    desc: "Simple daily reminders keep your treatment consistent and on track.",
  },
  {
    icon: "/icons/feature-order.svg",
    title: "Order Without \nthe Rush",
    desc: "Refill in minutes through trusted online pharmacies, directly from the app.",
  },
];

const STEPS = [
  {
    title: "Sync Scripts",
    desc: "Connect your Active Script List or upload scripts easily via the app.",
  },
  {
    title: "Set Reminders",
    desc: "Receive automated alerts to take your medication on time, every time.",
  },
  {
    title: "Get Refills",
    desc: "Refill with a single tap. We package up and ship directly to your doorstep.",
  },
];

const PHONE_SECTIONS = [
  {
    title: "Everything in One Place",
    img: "/images/landing/script.webp",
    w: 1038,
    h: 2285,
    phoneRight: false,
    bullets: [
      "Active and past prescriptions",
      "Medication timeline",
      "Simple overview",
    ],
  },
  {
    title: "Automatic Updates",
    img: "/images/landing/auto.webp",
    w: 1038,
    h: 2285,
    phoneRight: true,
    bullets: [
      "Real-time eScript sync",
      "No manual uploads",
      "Always up to date",
    ],
  },
  {
    title: "Secure by Design",
    img: "/images/landing/security.webp",
    w: 1038,
    h: 2285,
    phoneRight: false,
    bullets: [
      "Encrypted data",
      "Built for Australian privacy standards",
      "Secure authentication",
    ],
  },
];

const WHO = [
  {
    icon: "/icons/who-everyday.svg",
    title: "Everyday users",
    desc: "Perfect for anyone who takes regular medications and wants a simpler way to manage them",
  },
  {
    icon: "/icons/who-longterm.svg",
    title: "People managing long-term medications",
    desc: "Essential for chronic condition management with automatic reminders and tracking",
  },
  {
    icon: "/icons/who-caregiver.svg",
    title: "Caregivers",
    desc: "Help loved ones stay on track with their medications from anywhere",
  },
];

/** Logged-out marketing landing (Figma `251:2684`). */
export function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-app lg:bg-white">
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
          <div className="flex flex-col gap-6">
            <h1 className="text-h2-36 whitespace-pre-line text-secondary-900 max-lg:tracking-tight lg:text-hero-60">
              {"Smarter prescriptions.\nEasier refills.\nLess stress."}
            </h1>
            <p className="max-w-md text-body-16 text-secondary-300 lg:text-subtitle-18">
              Sync your eScripts, track your medications, and refill directly
              from trusted online pharmacies — all in one simple app.
            </p>
            <div className="flex gap-4">
              <Button
                asChild
                size="lg"
                className="flex-1 px-6 lg:flex-none lg:px-8"
              >
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="flex-1 px-6 lg:flex-none lg:px-8"
              >
                <Link href="/shop">Browse Shop</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <Image
              src="/images/landing/hero.webp"
              alt="OpenPharmacy app screens"
              width={2431}
              height={2570}
              className="h-auto w-full"
              priority
              sizes="(max-width: 1024px) 90vw, 600px"
            />
            <HeroChip text="eScript Synced" className="top-[6%] left-[38%]" />
            <HeroChip text="Schedule" className="top-[48%] left-[73%]" />
            <HeroChip
              text="Refill Reminder Tomorrow"
              className="top-[71%] left-[48%]"
            />
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-white">
        <Container className="flex flex-col gap-12 py-16 lg:py-20">
          <h2 className="text-center text-display-32 text-secondary-900 max-lg:tracking-tight lg:text-h2-36">
            Medication management made simple.
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-4 px-6 text-center sm:px-0"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-info-500/10">
                  <Icon src={feature.icon} size={28} />
                </div>
                <h3 className="text-title-20 whitespace-pre-line text-secondary-900">
                  {feature.title}
                </h3>
                <p className="text-body-16 text-secondary-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-bg-section">
        <Container className="flex flex-col gap-12 py-16 lg:py-20">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-h2-36 text-secondary-900">How It Works</h2>
            <p className="text-body-16 text-secondary-500">
              Three simple steps to better health management
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <Card
                key={step.title}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-info-500 text-title-20 text-white">
                  {index + 1}
                </div>
                <h3 className="text-h4-24 text-secondary-900">{step.title}</h3>
                <p className="text-body-14 text-secondary-500">{step.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Alternating phone feature sections */}
      {PHONE_SECTIONS.map((sec) => (
        <section key={sec.title} className="bg-white">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
            <div
              className={cn(
                "mx-auto",
                sec.phoneRight ? "lg:order-2" : "lg:order-1",
              )}
            >
              <Image
                src={sec.img}
                alt=""
                width={sec.w}
                height={sec.h}
                sizes="280px"
                className="h-auto w-[280px]"
              />
            </div>
            <div
              className={cn(
                "flex max-w-md flex-col gap-6",
                sec.phoneRight ? "lg:order-1" : "lg:order-2",
              )}
            >
              <h2 className="text-h2-36 text-secondary-900">{sec.title}</h2>
              <ul className="flex flex-col gap-5">
                {sec.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-info-500/10">
                      <Icon src="/icons/check.svg" size={16} />
                    </span>
                    <span className="text-body-16 text-secondary-300">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Who It's For */}
      <section className="bg-bg-section">
        <Container className="flex flex-col gap-12 py-16 lg:py-20">
          <h2 className="text-center text-h2-36 text-secondary-900">
            Who It&apos;s For
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {WHO.map((item) => (
              <Card
                key={item.title}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-info-500/10">
                  <Icon src={item.icon} size={28} />
                </div>
                <h3 className="text-title-20 text-secondary-900">
                  {item.title}
                </h3>
                <p className="text-body-14 text-secondary-500">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-info-500">
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-2">
          <div className="order-2 flex flex-col gap-6 text-white lg:order-1 lg:pl-16">
            <h2 className="text-display-32 lg:text-h2-48">
              Take control of your prescriptions.
            </h2>
            <p className="text-subtitle-18 text-white/90">
              All your medications. Synced. Organised. Easy.
            </p>
            <div className="flex flex-wrap gap-4">
              <StoreBadge
                top="GET IN ON"
                bottom="Google Play"
                glyph={<PlayGlyph />}
              />
              <StoreBadge
                top="GET IN ON"
                bottom="App Store"
                glyph={<AppleGlyph />}
              />
            </div>
          </div>
          <Image
            src="/images/landing/store.webp"
            alt=""
            width={1038}
            height={2048}
            sizes="320px"
            className="order-1 mx-auto h-auto w-full max-w-[320px] lg:order-2"
          />
        </Container>
      </section>
    </>
  );
}

function HeroChip({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={cn(
        "absolute rounded-chip border border-border-subtle bg-white px-4 py-2.5 text-body-14 whitespace-nowrap text-secondary-900 shadow-float",
        className,
      )}
    >
      {text}
    </span>
  );
}

function StoreBadge({
  top,
  bottom,
  glyph,
}: {
  top: string;
  bottom: string;
  glyph: React.ReactNode;
}) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-chip bg-white px-5 py-2.5 text-secondary-900 shadow-float"
    >
      {glyph}
      <span className="flex flex-col gap-0.5 leading-none">
        <span className="text-[11px]">{top}</span>
        <span className="text-[17px] font-bold">{bottom}</span>
      </span>
    </a>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
      <path
        fill="#00E0FF"
        d="M3.6 2.3 13.3 12 3.6 21.7c-.3-.2-.5-.6-.5-1.1V3.4c0-.5.2-.9.5-1.1Z"
      />
      <path
        fill="#00F076"
        d="m3.6 2.3 9.7 9.7 2.7-2.7L5.3 1.7c-.6-.3-1.2-.3-1.7.6Z"
      />
      <path
        fill="#FFC900"
        d="m13.3 12 2.7 2.7 4.1-2.4c.8-.5.8-1.6 0-2l-4.1-2.4-2.7 2.1Z"
      />
      <path
        fill="#FF3A44"
        d="m3.6 21.7 9.7-9.7 2.7 2.7-10.7 6.2c-.5.9-1.1.9-1.7.8Z"
      />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" fill="currentColor" aria-hidden>
      <path d="M16.36 12.78c.03 2.92 2.56 3.89 2.59 3.9-.02.07-.4 1.39-1.34 2.75-.8 1.18-1.64 2.35-2.96 2.37-1.3.03-1.72-.77-3.2-.77-1.49 0-1.95.75-3.18.8-1.27.05-2.24-1.27-3.06-2.45-1.66-2.42-2.93-6.84-1.22-9.83a4.74 4.74 0 0 1 4-2.44c1.25-.02 2.43.84 3.2.84.76 0 2.2-1.04 3.71-.89.63.03 2.4.26 3.54 1.92-.09.06-2.11 1.24-2.08 3.7M14 4.6c.68-.82 1.13-1.97.1-3.1-.91.04-2.01.61-2.71 1.43-.63.72-1.18 1.89-1.03 3 .98.07 1.97-.5 2.64-1.33" />
    </svg>
  );
}
