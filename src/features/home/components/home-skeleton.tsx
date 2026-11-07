import { cn } from "@/lib/utils";

function Block({ className }: { className?: string }) {
  return <div className={cn("rounded-xl bg-[#E2E8F0]", className)} />;
}

/** Loading placeholder for the dashboard (Figma `42:2760`). */
export function HomeSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[870px] animate-pulse px-4 py-8">
      <div className="flex flex-col gap-6">
        <Block className="h-10 w-72" />
        <div className="grid grid-cols-2 gap-2">
          <Block className="h-28" />
          <Block className="h-28" />
        </div>
        <Block className="h-28" />
        <Block className="h-16" />
        <Block className="h-16" />
        <div className="grid grid-cols-2 gap-2">
          <Block className="h-28" />
          <Block className="h-28" />
        </div>
        <Block className="h-20" />
      </div>
    </div>
  );
}
