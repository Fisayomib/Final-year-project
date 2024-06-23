import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
}

export const FormTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...textareaProps
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              className="resize-none"
              {...textareaProps}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
