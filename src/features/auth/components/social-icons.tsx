/** Brand glyphs for the auth social buttons (shared by sign-in and sign-up). */

export function GoogleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

export function AppleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M16.36 12.78c.03 2.92 2.56 3.89 2.59 3.9-.02.07-.4 1.39-1.34 2.75-.8 1.18-1.64 2.35-2.96 2.37-1.3.03-1.72-.77-3.2-.77-1.49 0-1.95.75-3.18.8-1.27.05-2.24-1.27-3.06-2.45-1.66-2.42-2.93-6.84-1.22-9.83a4.74 4.74 0 0 1 4-2.44c1.25-.02 2.43.84 3.2.84.76 0 2.2-1.04 3.71-.89.63.03 2.4.26 3.54 1.92-.09.06-2.11 1.24-2.08 3.7M14 4.6c.68-.82 1.13-1.97.1-3.1-.91.04-2.01.61-2.71 1.43-.63.72-1.18 1.89-1.03 3 .98.07 1.97-.5 2.64-1.33" />
    </svg>
  );
}

export function EnvelopeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
    </svg>
  );
}
