import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { AuthPhotoHero } from "./auth-photo-hero";
import { AuthSplit } from "./auth-split";

export function LaunchLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <Icon src="/icons/logo.svg" size={60} alt="" />
      <span className="font-brand text-[20px] leading-6 font-semibold text-secondary-500">
        OpenPharmacy
      </span>
    </div>
  );
}

function StartText({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-[323px] max-w-full flex-col gap-4 text-center text-secondary-900",
        className,
      )}
    >
      <h1 className="text-[46px] leading-[55px] font-bold whitespace-pre-wrap">
        {"Smarter prescriptions. \nLess stress."}
      </h1>
      <p className="text-body-16">
        Sync your eScripts, track your medications, and stay on top of your
        treatment - all in one simple app.
      </p>
    </div>
  );
}

function StartActions() {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Button asChild size="lg" className="w-full">
        <Link href="/sign-up">Get Started Free</Link>
      </Button>
      <p className="flex items-center text-body-16 text-neutral-900">
        <span>Already have an account?</span>
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="px-4 text-info-500 hover:bg-transparent hover:underline"
        >
          <Link href="/sign-in/quick">Sign in</Link>
        </Button>
      </p>
    </div>
  );
}

export function StartScreen() {
  return (
    <>
      <div className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-bg-app px-4 pt-6 pb-[49px] lg:hidden">
        <span className="pointer-events-none absolute top-[170px] left-[-243px] size-[878px] rounded-full bg-primary-bright/10" />
        <span className="pointer-events-none absolute top-[139px] left-[-30px] size-32 rounded-full bg-primary-500/20" />
        <span className="pointer-events-none absolute top-[100px] left-[286px] size-[77px] rounded-full bg-primary-500/20" />
        <LaunchLogo className="relative" />
        <StartText className="relative mt-[155px]" />
        <div className="relative mt-auto w-full pt-[127px]">
          <StartActions />
        </div>
      </div>

      <div className="hidden lg:block">
        <AuthSplit hero={<AuthPhotoHero />} showBack={false}>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex w-[480px] flex-col items-center">
              <LaunchLogo />
              <StartText className="mt-[155px]" />
              <div className="mt-[127px] w-full">
                <StartActions />
              </div>
            </div>
          </div>
        </AuthSplit>
      </div>
    </>
  );
}
