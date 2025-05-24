import { Plus, Trash2 } from "lucide-react";
import type { ArrayPath, FieldArrayWithId, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface DynamicArrayFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends ArrayPath<TFieldValues>
> {
  label: string;
  fields: FieldArrayWithId<TFieldValues, TFieldName, "id">[];
  append: (value: string) => void;
  remove: (index: number) => void;
  register: (fieldName: `${TFieldName}.${number}`) => {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    ref?: React.Ref<HTMLInputElement>;
  };
  errors?: { message?: string };
  fieldName: TFieldName;
  placeholder?: string;
}

export const DynamicArrayField = <
  TFieldValues extends FieldValues,
  TFieldName extends ArrayPath<TFieldValues>
>({
  label,
  fields,
  append,
  remove,
  register,
  errors,
  fieldName,
  placeholder = "Enter item",
}: DynamicArrayFieldProps<TFieldValues, TFieldName>) => (
  <div className="flex flex-col gap-2">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    {fields.map((field, index) => (
      <div key={field.id} className="flex gap-2">
        <Input
          {...register(`${fieldName}.${index}`)}
          placeholder={placeholder}
          className=" h-[45px]"
        />
        <Button
          type="button"
          onClick={() => remove(index)}
          className="px-3 py-2 "
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ))}
    <Button
      type="button"
      onClick={() => append("")}
      className=" px-3 py-2 bg-transparent border mt-2 border-black border-solid h-[45px] text-black shadow-sm shadow-black"
    >
      <Plus size={16} /> Add {label.replace(/s$/, "")}
    </Button>
    {errors?.message && (
      <p className="text-sm text-red-500">{errors.message}</p>
    )}
  </div>
);
