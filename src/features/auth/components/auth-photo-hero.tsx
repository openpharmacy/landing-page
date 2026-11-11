import Image from "next/image";

export function AuthPhotoHero({
  photoUnderCircles = false,
}: {
  photoUnderCircles?: boolean;
}) {
  const photo = (
    <Image
      src="/images/signup/signup-hero-photo-17256a.webp"
      alt=""
      width={478}
      height={641}
      priority
      unoptimized
      className="pointer-events-none absolute bottom-0 left-[21px] h-[641px] w-[478px] max-w-none -scale-x-100"
    />
  );
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-y-0 left-[-13px] w-[469px] bg-gradient-hero" />
      <span className="pointer-events-none absolute top-[303px] left-[-179px] size-[704px] rounded-full bg-primary-bright/20" />
      {photoUnderCircles && photo}
      <span className="pointer-events-none absolute top-[339px] left-[321px] size-32 rounded-full bg-primary-500/20" />
      <span className="pointer-events-none absolute top-[179px] left-[222px] size-[77px] rounded-full bg-primary-500/20" />
      {!photoUnderCircles && photo}
    </div>
  );
}
