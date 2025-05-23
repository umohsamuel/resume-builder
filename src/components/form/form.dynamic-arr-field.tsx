import { Plus, Trash2 } from "lucide-react";
import type { ArrayPath, FieldArrayWithId, FieldValues } from "react-hook-form";

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
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {fields.map((field, index) => (
      <div key={field.id} className="flex gap-2">
        <input
          {...register(`${fieldName}.${index}`)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => remove(index)}
          className="px-3 py-2 text-red-600 hover:text-red-800"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => append("")}
      className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800"
    >
      <Plus size={16} /> Add {label.replace(/s$/, "")}
    </button>
    {errors?.message && (
      <p className="text-sm text-red-500">{errors.message}</p>
    )}
  </div>
);
