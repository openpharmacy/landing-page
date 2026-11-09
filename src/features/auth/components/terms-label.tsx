import Link from "next/link";

import { Label } from "@/components/ui/label";

export function TermsLabel({ htmlFor }: { htmlFor: string }) {
  return (
    <Label htmlFor={htmlFor} className="text-legal-14 text-secondary-900">
      I agree with{" "}
      <Link href="/terms" className="font-bold text-info-500">
        Terms of Use
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="font-bold text-info-500">
        Privacy Policy
      </Link>
    </Label>
  );
}
