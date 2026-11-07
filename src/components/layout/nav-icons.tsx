/**
 * Inline navigation glyphs (Figma exports) shared by the desktop header nav and
 * the mobile bottom tab bar. They paint with `currentColor` so the active route
 * can tint icon + label together. Pure SVG — safe to import from server or
 * client components.
 */

// Home — Figma `vuesax/linear/home-2` (outline) when inactive.
export function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.9902V14.9902"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Home — Figma `vuesax/bold/home-2` (filled) when active.
export function HomeActiveIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M20.0402 6.82018L14.2802 2.79018C12.7102 1.69018 10.3002 1.75018 8.79023 2.92018L3.78023 6.83018C2.78023 7.61018 1.99023 9.21018 1.99023 10.4702V17.3702C1.99023 19.9202 4.06023 22.0002 6.61023 22.0002H17.3902C19.9402 22.0002 22.0102 19.9302 22.0102 17.3802V10.6002C22.0102 9.25018 21.1402 7.59018 20.0402 6.82018ZM12.7502 18.0002C12.7502 18.4102 12.4102 18.7502 12.0002 18.7502C11.5902 18.7502 11.2502 18.4102 11.2502 18.0002V15.0002C11.2502 14.5902 11.5902 14.2502 12.0002 14.2502C12.4102 14.2502 12.7502 14.5902 12.7502 15.0002V18.0002Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Scripts — Figma Rx prescription mark (the desktop nav's Scripts glyph).
export function ScriptsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="21"
      height="24"
      viewBox="0 0 21 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M13.4109 15.9703L6.52969 9.08906L2.925 12.6984C2.01094 13.6125 1.5 14.85 1.5 16.1391C1.5 18.825 3.67969 21.0047 6.36563 21.0047C7.65469 21.0047 8.89219 20.4938 9.80625 19.5797L13.4109 15.975V15.9703ZM14.4703 14.9109L18.075 11.3062C18.9891 10.3922 19.5 9.15469 19.5 7.86563C19.5 5.17969 17.3203 3 14.6344 3C13.3453 3 12.1078 3.51094 11.1938 4.425L7.58906 8.02969L14.4656 14.9062L14.4703 14.9109ZM19.1344 12.3656L10.8656 20.6344C9.67031 21.8297 8.05313 22.5 6.36563 22.5C2.85 22.5 0 19.65 0 16.1344C0 14.4469 0.670312 12.8297 1.86562 11.6344L10.1344 3.36563C11.3297 2.17031 12.9469 1.5 14.6344 1.5C18.15 1.5 21 4.35 21 7.86563C21 9.55313 20.3297 11.1703 19.1344 12.3656Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ScriptsActiveIcon({ className }: { className?: string }) {
  return (
    <svg
      width="21"
      height="24"
      viewBox="0 0 21 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M8.87344 8.87344L13.6266 13.6266L17.0156 10.2422C17.6484 9.60938 18 8.75625 18 7.86563C18 6.00938 16.4953 4.5 14.6344 4.5C13.7438 4.5 12.8859 4.85625 12.2578 5.48438L8.87344 8.86875V8.87344ZM19.1391 12.3656L10.8656 20.6344C9.67031 21.8297 8.05313 22.5 6.36563 22.5C2.85 22.5 0 19.65 0 16.1344C0 14.4469 0.670312 12.8297 1.86562 11.6344L10.1344 3.36563C11.3297 2.17031 12.9469 1.5 14.6344 1.5C18.15 1.5 21 4.35 21 7.86563C21 9.55313 20.3297 11.1703 19.1344 12.3656H19.1391Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Scripts capsule (Figma bottom-nav `341:6830`) — a diagonal pill. The mobile
// tab bar uses this rather than the desktop nav's Rx mark.
export function CapsuleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.5l7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Shop — Figma `vuesax/linear/search-normal` (outline magnifier) when inactive.
export function ShopIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Shop — Figma `vuesax/bold/search-normal` (filled magnifier) when active.
export function ShopActiveIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M11.5 2.5C16.4706 2.5 20.5 6.52944 20.5 11.5C20.5 16.4706 16.4706 20.5 11.5 20.5C6.52944 20.5 2.5 16.4706 2.5 11.5C2.5 6.52944 6.52944 2.5 11.5 2.5Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <path
        d="M19.3086 19.2983C19.3716 19.2404 19.4743 19.2278 19.5576 19.2817L19.5928 19.3101L21.4463 21.1636C21.5151 21.2326 21.5242 21.3536 21.4463 21.4429C21.3995 21.4814 21.3468 21.5004 21.2998 21.5005C21.2455 21.5005 21.1945 21.4781 21.1631 21.4468L19.3027 19.5864C19.232 19.5154 19.2231 19.3881 19.3086 19.2983Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}

// Cart bag (Figma `vuesax/linear/bag`) — inline so the selected state can tint
// it via currentColor.
export function CartGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M8.80994 2L5.18994 5.63"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1899 2L18.8099 5.63"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7.8501C2 6.0001 2.99 5.8501 4.22 5.8501H19.78C21.01 5.8501 22 6.0001 22 7.8501C22 10.0001 21.01 9.8501 19.78 9.8501H4.22C2.99 9.8501 2 10.0001 2 7.8501Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9.76001 14V17.55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.3601 14V17.55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 10L4.91 18.64C5.23 20.58 6 22 8.86 22H14.89C18 22 18.46 20.64 18.82 18.76L20.5 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Filled cart bag for the selected state. Figma has no bold `bag`, so this is a
// filled version of the same linear silhouette (rim + body) with stroked handles.
export function CartGlyphFilled({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M8.80994 2L5.18994 5.63"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1899 2L18.8099 5.63"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7.8501C2 6.0001 2.99 5.8501 4.22 5.8501H19.78C21.01 5.8501 22 6.0001 22 7.8501C22 10.0001 21.01 9.8501 19.78 9.8501H4.22C2.99 9.8501 2 10.0001 2 7.8501Z"
        fill="currentColor"
      />
      <path
        d="M3.5 10L4.91 18.64C5.23 20.58 6 22 8.86 22H14.89C18 22 18.46 20.64 18.82 18.76L20.5 10Z"
        fill="currentColor"
      />
    </svg>
  );
}
