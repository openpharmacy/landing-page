import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: "/icons/landing/scripts.svg",
    title: "All your scripts in one place",
    desc: "eScrips, pharmacy records, and treatment details in one clear view.",
  },
  {
    icon: "/icons/landing/calendar-tick.svg",
    title: "Refill on time, \nevery time",
    desc: "Smart reminders help you reorder before you run out. No last-minute stress.",
  },
  {
    icon: "/icons/landing/clock.svg",
    title: "Never \nmiss a dose",
    desc: "Simple daily reminders keep your treatment consistent and on track.",
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
    title: "Stay on Track",
    desc: "Keep your medication schedule organised and know when it’s time to refill.",
  },
];

const WHO = [
  {
    icon: "/icons/landing/profile.svg",
    title: "Everyday users",
    desc: "Perfect for anyone who takes regular medications and wants a simpler way to manage them",
  },
  {
    icon: "/icons/landing/heart.svg",
    title: "People managing long-term medications",
    desc: "Essential for chronic condition management with automatic reminders and tracking",
  },
  {
    icon: "/icons/landing/profile-2user.svg",
    title: "Caregivers",
    desc: "Help loved ones stay on track with their medications from anywhere",
  },
];

const STORES = {
  googlePlay:
    "https://play.google.com/store/apps/details?id=com.openpharmacy.production",
  appStore: "https://apps.apple.com/au/app/openpharmacy/id6751562406",
};

const SCREEN = {
  scripts: "/images/landing/screen-scripts.webp",
  home: "/images/landing/screen-home.webp",
  aslLinked: "/images/landing/screen-asl-linked.webp",
};

export function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <PhoneSections />
      <WhoItsFor />
      <Cta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-bg-app lg:h-[679px] lg:bg-white">
      <div className="mx-auto flex w-full max-w-[390px] flex-col gap-6 px-[14.5px] py-6 lg:max-w-[1280px] lg:gap-9 lg:px-6 lg:pt-[216px] lg:pb-0">
        <div className="flex flex-col gap-4">
          <h1 className="h-[165px] text-[46px] leading-[55px] font-bold whitespace-pre-line text-secondary-900 lg:h-[130px] lg:w-[600px] lg:text-hero-60">
            {"Smarter prescriptions. \nLess stress."}
          </h1>
          <p className="text-subtitle-18 text-secondary-300 lg:h-14 lg:w-[534px]">
            Sync your eScripts, track your medications, and stay on top of your
            treatment - all in one simple app.
          </p>
        </div>
        <Button asChild size="lg" className="w-full lg:w-fit">
          <Link href="/sign-up">Get Started Free</Link>
        </Button>
      </div>

      <div
        aria-hidden
        className="absolute top-[19px] left-[calc(50%+20px)] hidden h-[626px] w-[592px] xl:block"
      >
        <Phone
          screen={<Screen src={SCREEN.scripts} />}
          screenLeft={41.5472}
          shadow={SHADOW.desktop}
          className="[transform:matrix(0.211695,0.122222,-0.12313,0.213268,381.0918,-0.0991)]"
        />
        <Phone
          screen={<Screen src={SCREEN.home} />}
          shadow={SHADOW.desktop}
          className="[transform:matrix(0.229702,-0.083605,0.084226,0.231409,0.2656,160.3036)]"
        />
        <Pill className="top-[81px] left-[255px]">eScript Synced</Pill>
        <Pill className="top-[306px] left-[454px]">Schedule</Pill>
        <Pill className="top-[456px] left-[301px]">
          Refill Reminder Tomorrow
        </Pill>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-white px-4 py-12 lg:px-6 lg:py-[120px]">
      <h2 className="text-center text-display-32 text-secondary-900 lg:text-h2-36">
        Medication management made simple.
      </h2>
      <ul className="mx-auto mt-12 flex max-w-[1200px] flex-col items-center gap-9 lg:flex-row lg:items-start lg:justify-between">
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="flex w-full flex-col items-center gap-3 px-6 lg:w-[284px]"
          >
            <IconBadge src={feature.icon} size={36} />
            <div className="flex flex-col gap-2 text-center">
              <h3 className="text-title-20 whitespace-pre-wrap text-secondary-900">
                {feature.title}
              </h3>
              <p className="text-body-16 text-secondary-300">{feature.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-bg-section px-4 pt-12 pb-9 lg:px-6 lg:pb-12">
      <div className="flex flex-col items-center text-center lg:gap-2">
        <h2 className="text-display-32 text-secondary-900 lg:text-h2-36">
          How It Works
        </h2>
        <p className="text-body-16 text-secondary-300">
          Three simple steps to better health management
        </p>
      </div>
      <ol className="mx-auto mt-6 flex max-w-[1232px] flex-col gap-9 lg:mt-[38px] lg:grid lg:grid-cols-3 lg:gap-12">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col items-center gap-[18px] rounded-card border border-bg-app bg-white px-[15px] py-[35px] text-center lg:border-0 lg:px-4 lg:py-9"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-primary-500 text-h4-24 text-white">
              {index + 1}
            </span>
            <h3 className="text-h4-24 text-secondary-900">{step.title}</h3>
            <p className="text-body-16 text-secondary-300">{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PhoneSections() {
  return (
    <section className="bg-white py-9 lg:pt-0 lg:pb-[124px]">
      <div className="mx-auto flex flex-col gap-20 lg:w-[734px] lg:gap-[155px]">
        <PhoneRow
          title="Everything in One Place"
          titleClassName="text-display-32 lg:text-h3-30"
          bullets={[
            "Active and past prescriptions",
            "Medication timeline",
            "Simple overview",
          ]}
          className="lg:gap-[135px]"
          mockupClassName="h-[359.24px] lg:h-[495.66px]"
        >
          <Phone
            screen={<Screen src={SCREEN.scripts} />}
            className="[transform:matrix(0.177045,0,0,0.178361,0.0826,0)] lg:[transform:matrix(0.244444,0,0,0.24626,0.2823,62.001)]"
          />
        </PhoneRow>
        <PhoneRow
          title="Automatic Updates"
          bullets={[
            "Real-time eScript sync",
            "No manual uploads",
            "Always up to date",
          ]}
          className="lg:flex-row-reverse lg:justify-between"
        >
          <Phone
            screen={<Screen src={SCREEN.aslLinked} />}
            className="[transform:matrix(0.176801,0,0,0.178114,0.2041,0)] lg:[transform:matrix(0.244444,0,0,0.24626,0.2823,62.001)]"
          />
        </PhoneRow>
        <PhoneRow
          title="Secure by Design"
          bullets={[
            "Encrypted data",
            "Built for Australian privacy standards",
            "Secure authentication",
          ]}
          className="lg:gap-[135px]"
        >
          <Phone
            screen={<SecurityScreen />}
            className="[transform:matrix(0.176801,0,0,0.178114,0.2041,-0.4812)] lg:[transform:matrix(0.244444,0,0,0.24626,0.2823,62.001)]"
          />
        </PhoneRow>
      </div>
    </section>
  );
}

function PhoneRow({
  title,
  titleClassName = "text-h3-30",
  bullets,
  className,
  mockupClassName = "h-[358.5px] lg:h-[495.66px]",
  children,
}: {
  title: string;
  titleClassName?: string;
  bullets: string[];
  className?: string;
  mockupClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-12 px-6 lg:flex-row lg:px-0",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-[176px] shrink-0 lg:w-[243.34px]",
          mockupClassName,
        )}
      >
        {children}
      </div>
      <div className="flex w-full flex-col gap-6 lg:w-auto">
        <h2 className={cn("h-9 text-secondary-900", titleClassName)}>
          {title}
        </h2>
        <ul className="flex flex-col gap-4">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-info-500/10">
                <Image
                  src="/icons/landing/check.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  loading="eager"
                />
              </span>
              <span className="text-body-18 text-secondary-300">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WhoItsFor() {
  return (
    <section className="bg-bg-section px-4 pt-12 pb-9 lg:px-6 lg:pb-12">
      <h2 className="text-center text-display-32 text-secondary-900 lg:text-h2-36">
        Who It&apos;s For
      </h2>
      <ul className="mx-[-10.335px] mt-12 flex flex-col gap-9 lg:mx-auto lg:mt-[38px] lg:grid lg:max-w-[1232px] lg:grid-cols-3 lg:items-start lg:gap-12">
        {WHO.map((item) => (
          <li
            key={item.title}
            className="flex flex-col items-center gap-[18px] rounded-card bg-white px-4 py-9 text-center"
          >
            <IconBadge src={item.icon} size={24} />
            <h3 className="text-h4-24 text-secondary-900">{item.title}</h3>
            <p className="text-body-16 text-secondary-300">{item.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative mt-0.5 flex flex-col items-center gap-9 bg-info-500 px-6 py-[75px] lg:mt-0 lg:block lg:h-[646px] lg:p-0">
      <div className="relative h-[350.54px] w-[172.09px] lg:absolute lg:top-[75px] lg:left-[calc(50%+215px)] lg:h-[495.66px] lg:w-[243.34px]">
        <Phone
          screen={<Screen src={SCREEN.scripts} />}
          shadow={SHADOW.cta}
          className="[transform:matrix(0.172872,0,0,0.174156,0.1997,0)] lg:[transform:matrix(0.244444,0,0,0.24626,0.2823,0)]"
        />
      </div>
      <div className="flex w-full flex-col gap-[30px] lg:absolute lg:top-[181px] lg:left-[calc(50%-419px)] lg:w-[435px]">
        <div className="flex h-44 flex-col gap-2 text-white lg:gap-6">
          <h2 className="text-display-32 lg:text-[48px] lg:leading-[58px]">
            Take control of your prescriptions.
          </h2>
          <p className="text-[18px] leading-6">
            All your medications. Synced. Organised. Easy.
          </p>
        </div>
        <div className="flex gap-[20.19px] lg:gap-[22px]">
          <StoreBadge
            href={STORES.googlePlay}
            src="/images/landing/badge-google-play.webp"
            label="Get it on Google Play"
          />
          <StoreBadge
            href={STORES.appStore}
            src="/images/landing/badge-app-store.webp"
            label="Download on the App Store"
          />
        </div>
      </div>
    </section>
  );
}

const SHADOW = {
  desktop: "drop-shadow-[0_5.3818px_4.0364px_rgb(0_0_0/0.1)]",
  row: "drop-shadow-[0_3.895px_2.921px_rgb(0_0_0/0.1)] lg:drop-shadow-[0_5.3818px_4.0364px_rgb(0_0_0/0.1)]",
  cta: "drop-shadow-[0_3.806px_2.855px_rgb(0_0_0/0.1)] lg:drop-shadow-[0_5.3818px_4.0364px_rgb(0_0_0/0.1)]",
};

function Phone({
  screen,
  screenLeft = 39.8716,
  shadow = SHADOW.row,
  className,
}: {
  screen: ReactNode;
  screenLeft?: number;
  shadow?: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", shadow)}>
      <div
        className={cn(
          "absolute top-0 left-0 h-[2012.772px] w-[995.4694px] origin-top-left",
          className,
        )}
      >
        <Image
          src="/images/landing/device.webp"
          alt=""
          fill
          unoptimized
          loading="eager"
          className="max-w-none"
        />
        <div
          className="absolute top-[35.0836px] h-[1942.8388px] w-[913.6888px] overflow-hidden rounded-[110.8656px]"
          style={{ left: screenLeft }}
        >
          {screen}
        </div>
      </div>
    </div>
  );
}

function ScreenBox({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-[-3.806px] left-0 h-[1916.7112px] w-[893.3824px] origin-top-left scale-x-[1.02273] scale-y-[1.015186]">
      {children}
    </div>
  );
}

function Screen({ src }: { src: string }) {
  return (
    <ScreenBox>
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        loading="eager"
        className="max-w-none object-cover"
      />
    </ScreenBox>
  );
}

function SecurityScreen() {
  return (
    <>
      <ScreenBox>
        <div className="size-full bg-[linear-gradient(153.9deg,#f8fbfd_56.5%,#269df9_191.9%)]" />
      </ScreenBox>
      <div className="absolute top-[722.9256px] left-[212.6108px] size-[484px] origin-top-left scale-x-[1.02273] scale-y-[1.015186] rounded-full bg-primary-500">
        <Image
          src="/icons/landing/security.svg"
          alt=""
          width={81}
          height={81}
          unoptimized
          loading="eager"
          className="absolute top-[80.6668px] left-[80.6668px] size-[322.6668px] max-w-none"
        />
      </div>
    </>
  );
}

function Pill({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "absolute rounded-chip border border-border-subtle bg-white p-[15px] text-body-14 whitespace-nowrap text-secondary-900 shadow-float",
        className,
      )}
    >
      {children}
    </span>
  );
}

function IconBadge({ src, size }: { src: string; size: number }) {
  return (
    <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-info-500/10">
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        unoptimized
        loading="eager"
      />
    </span>
  );
}

function StoreBadge({
  href,
  src,
  label,
}: {
  href: string;
  src: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block aspect-[162.41/51.39] w-[min(162.41px,calc(50%-8.59px))] shrink-0 overflow-hidden rounded-[12.85px] bg-white shadow-[0_3.67px_5.51px_-3.67px_rgb(0_0_0/0.1),0_9.18px_13.76px_-2.75px_rgb(0_0_0/0.1)] lg:h-14 lg:w-[177px] lg:rounded-chip lg:shadow-float"
    >
      <Image
        src={src}
        alt={label}
        width={354}
        height={112}
        unoptimized
        loading="eager"
        className="size-full"
      />
    </a>
  );
}
