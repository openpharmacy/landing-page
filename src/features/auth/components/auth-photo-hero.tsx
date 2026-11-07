import Image from "next/image";

/**
 * Figma email sign-up left panel (42:2354): gradient + faint circles + a photo
 * cut-out anchored to the bottom-left. The large circle is allowed to bleed
 * past the panel edge into the form area (the panel itself is not clipped); the
 * photo is clipped to the panel via its own wrapper.
 */
export function AuthPhotoHero() {
  return (
    <div className="relative h-full bg-gradient-hero">
      {/* Large circle bleeds past the right edge into the form (Figma). */}
      <span className="pointer-events-none absolute top-[210px] left-[-130px] size-[760px] rounded-full bg-primary-bright/20" />
      <span className="pointer-events-none absolute top-[339px] left-[321px] size-32 rounded-full bg-primary-500/20" />
      <span className="pointer-events-none absolute top-[179px] left-[222px] size-[77px] rounded-full bg-primary-500/20" />

      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/signup/signup-hero-photo-17256a.webp"
          alt=""
          width={478}
          height={641}
          priority
          sizes="478px"
          className="absolute bottom-0 left-[21px] h-auto w-[478px] -scale-x-100"
        />
      </div>
    </div>
  );
}
