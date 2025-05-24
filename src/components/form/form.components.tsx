import type {
  Control,
  FieldErrors,
  Path,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormInputType<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  placeholder: string;
  required?: boolean;
}

interface FormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  input: FormInputType<T>;
}

export function FormInputItem<T extends FieldValues>({
  errors,
  control,
  input,
}: FormProps<T>) {
  const errorMessage =
    errors[input.name as keyof typeof errors]?.message || null;

  return (
    <FormField<T>
      control={control}
      name={input.name}
      render={({ field }) => (
        <FormItem className="col-span-2 lg:col-span-1">
          <FormControl>
            <div className="flex flex-col gap-[6px]">
              <label htmlFor={input.name} className="font-medium text-sm">
                {errorMessage ? (
                  <span className="text-red-500">{String(errorMessage)}</span>
                ) : (
                  input.label
                )}
              </label>

              {input.type === "textarea" ? (
                <Textarea
                  className="h-[145px]"
                  placeholder={input.placeholder}
                  {...field}
                />
              ) : (
                <Input
                  placeholder={input.placeholder}
                  className="h-[45px]"
                  type={input.type}
                  {...field}
                />
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
