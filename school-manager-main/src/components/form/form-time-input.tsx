import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { TimeInput } from "@nextui-org/date-input";
import { parseTime } from "@internationalized/date";

interface FormTimeInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
}

export const FormTimeInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
}: FormTimeInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative -top-0.5 w-full space-y-0">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <TimeInput
              aria-label={label}
              className="h-9 w-full rounded-md border"
              defaultValue={field.value ? parseTime(field.value) : undefined}
              onChange={(value) => field.onChange(value.toString())}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
