import { FormMessage } from "@/components/ui/form";
import { FormErrorProps } from "@/interfaces/shared/feedback";

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-1 h-1 rounded-full bg-red-500" />
      <FormMessage className="text-xs font-medium text-red-500">
        {message}
      </FormMessage>
    </div>
  );
}; 