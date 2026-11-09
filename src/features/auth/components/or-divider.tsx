export function OrDivider({ label = "OR" }: { label?: string }) {
  return (
    <div className="flex items-center gap-6">
      <span className="h-px flex-1 bg-neutral-300" />
      <span className="text-body-14 text-secondary-500">{label}</span>
      <span className="h-px flex-1 bg-neutral-300" />
    </div>
  );
}
