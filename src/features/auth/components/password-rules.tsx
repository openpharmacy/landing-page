import { Icon } from "@/components/ui/icon";

import { passwordRules } from "../model/schema";

export function PasswordRules({ value }: { value: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {passwordRules.map((rule) => (
        <span
          key={rule.id}
          className="flex items-center gap-1 text-body-14 text-secondary-500"
        >
          <Icon
            src={
              rule.test(value)
                ? "/icons/auth/rule-check.svg"
                : "/icons/auth/rule-x.svg"
            }
            size={18}
          />
          {rule.label}
        </span>
      ))}
    </div>
  );
}
