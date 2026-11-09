import Image from "next/image";

import { AuthPhotoHero } from "./auth-photo-hero";
import { AuthSplit } from "./auth-split";
import { SplashRedirect } from "./splash-redirect";
import { LaunchLogo } from "./start-screen";

export function SplashScreen() {
  return (
    <>
      <SplashRedirect href="/welcome" />
      <div className="relative flex h-dvh items-center justify-center overflow-hidden pb-9 lg:hidden">
        <span className="absolute -top-9 -right-[11px] bottom-0 -left-[13px] bg-[linear-gradient(300.5deg,#3b7bb5_37.6%,#5cb4f8_109.7%)]" />
        <span className="absolute top-[178px] left-[-179px] size-[704px] rounded-full bg-primary-bright/20" />
        <span className="absolute top-[516px] left-[321px] size-32 rounded-full bg-primary-500/20" />
        <span className="absolute top-[93px] left-[-113px] h-[206px] w-[225px] rounded-full bg-primary-500/20" />
        <span className="absolute top-[54px] left-[222px] size-[77px] rounded-full bg-primary-500/20" />
        <div className="relative flex flex-col items-center gap-[5.18px]">
          <Image
            src="/images/auth/logo-white.webp"
            alt=""
            width={78}
            height={78}
            unoptimized
            className="size-[77.7px]"
          />
          <span className="font-brand text-[25.9px] leading-[31.07px] font-semibold text-white">
            OpenPharmacy
          </span>
        </div>
      </div>

      <div className="hidden lg:block">
        <AuthSplit hero={<AuthPhotoHero />} showBack={false}>
          <div className="absolute inset-0 flex items-center justify-center">
            <LaunchLogo />
          </div>
        </AuthSplit>
      </div>
    </>
  );
}
