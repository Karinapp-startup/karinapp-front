import { cn } from "@/lib/utils";
import { passwordValidations } from "@/validators/schemas/password";
import { PasswordRequirementsProps } from "@/interfaces/shared/validation";

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs">
      <p className="text-gray-600 mb-2">La contraseña debe contener:</p>
      <ul className="space-y-1 text-gray-500">
        {passwordValidations.map((validation) => (
          <li key={validation.id} className="flex items-center gap-2">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              validation.check(password) ? "bg-green-500" : "bg-gray-300"
            )} />
            {validation.text}
          </li>
        ))}
      </ul>
    </div>
  );
}; 