import { AlertCircle } from "lucide-react";

export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-card border border-error-500/30 bg-error-500/5 px-4 py-3 text-body-14 text-error-500"
    >
      <AlertCircle className="mt-px size-5 shrink-0" strokeWidth={2} />
      <span>{message}</span>
    </div>
  );
}
