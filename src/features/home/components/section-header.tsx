import Link from "next/link";

export function SectionHeader({
  title,
  href = "#",
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-h4-24 text-secondary-900">{title}</h2>
      <Link href={href} className="text-body-16 text-info-500 hover:underline">
        View all
      </Link>
    </div>
  );
}
