export function EmailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="font-bold wrap-anywhere text-info-500 hover:underline"
    >
      {email}
    </a>
  );
}
