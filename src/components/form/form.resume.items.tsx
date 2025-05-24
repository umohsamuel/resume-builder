import { Plus, Trash2 } from "lucide-react";
import { SectionHeader } from "../header/form.section.header";
import { DynamicArrayField } from "./form.dynamic-arr-field";
import {
  Controller,
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { ResumeFormData } from "@/lib/form.validation";
import {
  awardInputs,
  certificationInputs,
  contactInputs,
  educationInputs,
  projectInputs,
  workExperienceInputs,
} from "@/lib/form.inputs";

import { FormInputItem } from "./form.components";
import { Button } from "../ui/button";

interface BaseFormProps {
  register: UseFormRegister<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
}

interface FormProps extends BaseFormProps {
  control: Control<ResumeFormData>;
}

export const ContactInformation = ({
  errors,
  control,
  register,
}: FormProps) => {
  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <SectionHeader title="Contact Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactInputs.map((input) => (
          <FormInputItem<ResumeFormData>
            key={input.name}
            register={register}
            control={control}
            errors={errors}
            input={input}
          />
        ))}
      </div>
    </section>
  );
};

export const ProfessionalSummary = ({
  register,
  control,
  errors,
}: FormProps) => {
  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <SectionHeader title="Professional Summary" />
      <FormInputItem<ResumeFormData>
        register={register}
        control={control}
        errors={errors}
        input={{
          label: "Professional Summary",
          type: "textarea",
          name: "professionalSummary",
          placeholder: "Enter Professional Summary",
          required: true,
        }}
      />
    </section>
  );
};

export const Experience = ({ register, control, errors }: FormProps) => {
  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <SectionHeader
        title="Work Experience"
        subtitle="List your work experience in reverse chronological order (most recent first). Use MM/YYYY format for dates."
      />
      {workFields.map((field, index) => (
        <div
          key={field.id}
          className="mb-6 p-4 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              Work Experience #{index + 1}
            </h3>
            {workFields.length > 1 && (
              <Button type="button" onClick={() => removeWork(index)}>
                <Trash2 size={20} />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {workExperienceInputs(index).map((input, idx) => (
              <FormInputItem<ResumeFormData>
                key={idx}
                register={register}
                control={control}
                errors={errors}
                input={input}
              />
            ))}
          </div>
          <Controller
            name={`workExperience.${index}.responsibilities`}
            control={control}
            render={({ field }) => (
              <DynamicArrayField
                label="Key Achievements & Responsibilities "
                fields={field.value.map((item: string, idx: number) => ({
                  id: `${idx}`,
                  value: item,
                }))}
                append={(value: string) =>
                  field.onChange([...field.value, value])
                }
                remove={(idx: number) =>
                  field.onChange(
                    field.value.filter((_: unknown, i: number) => i !== idx)
                  )
                }
                register={(fieldName: string) => ({
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const idx = parseInt(fieldName.split(".").pop() || "0");
                    const newValues = [...field.value];
                    newValues[idx] = e.target.value;
                    field.onChange(newValues);
                  },
                  value:
                    field.value[parseInt(fieldName.split(".").pop() || "0")] ||
                    "",
                })}
                errors={errors.workExperience?.[index]?.responsibilities}
                fieldName={`workExperience.${index}.responsibilities`}
                placeholder="Describe your achievements and responsibilities."
              />
            )}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            appendWork({
              position: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              responsibilities: [""],
            })
          }
          className=" px-4 py-2 h-[45px] "
        >
          <Plus size={16} /> Add Work Experience
        </Button>
      </div>
    </section>
  );
};

export const Education = ({ register, control, errors }: FormProps) => {
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <SectionHeader
        title="Education"
        subtitle="List your education in reverse chronological order. Use MM/YYYY format for dates."
      />
      {educationFields.map((field, index) => (
        <div
          key={field.id}
          className="mb-6 p-4 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Education #{index + 1}</h3>
            {educationFields.length > 1 && (
              <Button type="button" onClick={() => removeEducation(index)}>
                <Trash2 size={20} />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationInputs(index).map((input, idx) => (
              <FormInputItem<ResumeFormData>
                key={idx}
                register={register}
                control={control}
                errors={errors}
                input={input}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            appendEducation({
              institution: "",
              degree: "",
              location: "",
              startDate: "",
              endDate: "",
            })
          }
          className=" px-4 py-2 h-[45px]"
        >
          <Plus size={16} /> Add Education
        </Button>
      </div>
    </section>
  );
};

export const Skills = ({ register, control, errors }: FormProps) => {
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <SectionHeader
        title="Skills"
        subtitle="Organize your skills by category (e.g., Technical Skills, Soft Skills)"
      />
      {skillFields.map((field, index) => (
        <div
          key={field.id}
          className="mb-6 p-4 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Skill Category #{index + 1}</h3>
            {skillFields.length > 1 && (
              <Button type="button" onClick={() => removeSkill(index)}>
                <Trash2 size={20} />
              </Button>
            )}
          </div>
          <div className="mb-4">
            <FormInputItem<ResumeFormData>
              register={register}
              control={control}
              errors={errors}
              input={{
                label: "Category Name",
                type: "text",
                name: `skills.${index}.category`,
                placeholder: "e.g., Technical Skills, Soft Skills, Languages",
              }}
            />
          </div>
          <Controller
            name={`skills.${index}.items`}
            control={control}
            render={({ field }) => (
              <DynamicArrayField
                label="Skills"
                fields={field.value.map((item: string, idx: number) => ({
                  id: `${idx}`,
                  value: item,
                }))}
                append={(value: string) =>
                  field.onChange([...field.value, value])
                }
                remove={(idx: number) =>
                  field.onChange(
                    field.value.filter((_: unknown, i: number) => i !== idx)
                  )
                }
                register={(fieldName: string) => ({
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const idx = parseInt(fieldName.split(".").pop() || "0");
                    const newValues = [...field.value];
                    newValues[idx] = e.target.value;
                    field.onChange(newValues);
                  },
                  value:
                    field.value[parseInt(fieldName.split(".").pop() || "0")] ||
                    "",
                })}
                errors={errors.skills?.[index]?.items}
                fieldName={`skills.${index}.items`}
                placeholder="Enter a skill"
              />
            )}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            appendSkill({
              category: "",
              items: [""],
            })
          }
          className=" px-4 py-2 h-[45px]"
        >
          <Plus size={16} /> Add Skill Category
        </Button>
      </div>
    </section>
  );
};

export const Projects = ({ register, control, errors }: FormProps) => {
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Projects</h3>
      {projectFields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 p-4 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Project #{index + 1}</h4>
            <Button type="button" onClick={() => removeProject(index)}>
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {projectInputs(index).map((input, idx) => (
              <FormInputItem<ResumeFormData>
                key={idx}
                register={register}
                control={control}
                errors={errors}
                input={input}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            appendProject({
              title: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className=" px-3 py-2 h-[45px]"
        >
          <Plus size={16} /> Add Project
        </Button>
      </div>
    </div>
  );
};

export const Certifications = ({ register, control, errors }: FormProps) => {
  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Certifications</h3>
      {certificationFields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 p-4 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Certification #{index + 1}</h4>
            <Button type="button" onClick={() => removeCertification(index)}>
              <Trash2 size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificationInputs(index).map((input, idx) => (
              <FormInputItem<ResumeFormData>
                key={idx}
                register={register}
                control={control}
                errors={errors}
                input={input}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            appendCertification({
              name: "",
              issuingOrganization: "",
              issueDate: "",
              expirationDate: "",
            })
          }
          className="px-3 py-2 h-[45px]"
        >
          <Plus size={16} /> Add Certification
        </Button>
      </div>
    </div>
  );
};

export const Awards = ({ register, control, errors }: FormProps) => {
  const {
    fields: awardFields,
    append: appendAward,
    remove: removeAward,
  } = useFieldArray({
    control,
    name: "awards",
  });

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Awards & Honors</h3>
      {awardFields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 p-4 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Award #{index + 1}</h4>
            <Button type="button" onClick={() => removeAward(index)}>
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {awardInputs(index).map((input, idx) => (
              <FormInputItem<ResumeFormData>
                key={idx}
                register={register}
                control={control}
                errors={errors}
                input={input}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            appendAward({
              name: "",
              issuingOrganization: "",
              date: "",
              description: "",
            })
          }
          className=" px-3 py-2 h-[45px]"
        >
          <Plus size={16} /> Add Award
        </Button>
      </div>
    </div>
  );
};

export const OptionalSections = ({ register, control, errors }: FormProps) => {
  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <SectionHeader title="Optional Sections" />
      <Projects control={control} errors={errors} register={register} />
      <Certifications control={control} errors={errors} register={register} />
      <Awards control={control} errors={errors} register={register} />
    </section>
  );
};

// select case

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

//  input.type === "select" ? (
//   <FormField
//     control={control}
//     name={input.name as keyof ContactInputs}
//     key={input.name}
//     render={({ field }) => (
//       <FormItem className="lg:col-span-2">
//         <FormControl>
//           <div className="flex flex-col gap-[6px] ">
//             <label
//               htmlFor={input.name}
//               className="font-medium text-sm"
//             >
//               {(errors as Record<string, { message?: string }>)[
//                 input.name
//               ]?.message ? (
//                 <span className="text-red-500">
//                   {
//                     (errors as Record<string, { message?: string }>)[
//                       input.name
//                     ]?.message
//                   }
//                 </span>
//               ) : (
//                 input.label
//               )}
//             </label>
//             <Select
//               onValueChange={field.onChange}
//               defaultValue={field.value}
//             >
//               <SelectTrigger className="w-full h-[45px]">
//                 <SelectValue placeholder={input.placeholder} />
//               </SelectTrigger>
//               <SelectContent>
//                 {input.options?.map((opt) => (
//                   <SelectItem key={opt.value} value={opt.value}>
//                     {opt.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </FormControl>
//       </FormItem>
//     )}
//   />
// )
