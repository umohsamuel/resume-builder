import { Plus, Trash2 } from "lucide-react";
import { SectionHeader } from "../header/form.section.header";
import { DynamicArrayField } from "./form.dynamic-arr-field";
import { FormInput, FormTextarea } from "../input";
import {
  Controller,
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { ResumeFormData } from "@/lib/form.validation";

interface BaseFormProps {
  register: UseFormRegister<ResumeFormData>;
  errors: FieldErrors<ResumeFormData>;
}

interface FormProps extends BaseFormProps {
  control: Control<ResumeFormData>;
}

export const ContactInformation = ({ register, errors }: BaseFormProps) => {
  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <SectionHeader title="Contact Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          required
          {...register("contactInfo.name")}
          error={errors.contactInfo?.name?.message}
        />
        <FormInput
          label="Professional Title"
          required
          {...register("contactInfo.title")}
          error={errors.contactInfo?.title?.message}
        />
        <FormInput
          label="Professional Email"
          type="email"
          required
          {...register("contactInfo.email")}
          error={errors.contactInfo?.email?.message}
        />
        <FormInput
          label="Phone Number"
          required
          {...register("contactInfo.phone")}
          error={errors.contactInfo?.phone?.message}
        />
        <FormInput
          label="City/State/Zip Code"
          required
          {...register("contactInfo.location")}
          error={errors.contactInfo?.location?.message}
        />
        <FormInput
          label="Website"
          type="url"
          {...register("contactInfo.website")}
          error={errors.contactInfo?.website?.message}
        />
        <FormInput
          type="url"
          label="LinkedIn URL"
          {...register("contactInfo.linkedinUrl")}
          error={errors.contactInfo?.linkedinUrl?.message}
        />
        <FormInput
          type="url"
          label="Portfolio Link"
          {...register("contactInfo.portfolioLink")}
          error={errors.contactInfo?.portfolioLink?.message}
        />
      </div>
    </section>
  );
};

export const ProfessionalSummary = ({ register, errors }: BaseFormProps) => {
  return (
    <section className="bg-gray-50 p-6 rounded-lg">
      <SectionHeader title="Professional Summary" />
      <FormTextarea
        label="Professional Summary"
        required
        {...register("professionalSummary")}
        error={errors.professionalSummary?.message}
        placeholder="Write a compelling professional summary highlighting your key qualifications and career objectives..."
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
              <button
                type="button"
                onClick={() => removeWork(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              label="Job Title"
              required
              {...register(`workExperience.${index}.position`)}
              error={errors.workExperience?.[index]?.position?.message}
            />
            <FormInput
              label="Company Name"
              required
              {...register(`workExperience.${index}.company`)}
              error={errors.workExperience?.[index]?.company?.message}
            />
            <FormInput
              label="Company Location"
              required
              {...register(`workExperience.${index}.location`)}
              error={errors.workExperience?.[index]?.location?.message}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Start Date"
                placeholder="MM/YYYY"
                required
                {...register(`workExperience.${index}.startDate`)}
                error={errors.workExperience?.[index]?.startDate?.message}
              />
              <FormInput
                label="End Date"
                placeholder="MM/YYYY"
                required
                {...register(`workExperience.${index}.endDate`)}
                error={errors.workExperience?.[index]?.endDate?.message}
              />
            </div>
          </div>
          <Controller
            name={`workExperience.${index}.responsibilities`}
            control={control}
            render={({ field }) => (
              <DynamicArrayField
                label="Key Achievements & Responsibilities"
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
                placeholder="Describe your key achievements and responsibilities..."
              />
            )}
          />
        </div>
      ))}
      <button
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
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Plus size={16} /> Add Work Experience
      </button>
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
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Degree Name"
              required
              {...register(`education.${index}.degree`)}
              error={errors.education?.[index]?.degree?.message}
            />
            <FormInput
              label="Institution Name"
              required
              {...register(`education.${index}.institution`)}
              error={errors.education?.[index]?.institution?.message}
            />
            <FormInput
              label="Institution Location"
              required
              {...register(`education.${index}.location`)}
              error={errors.education?.[index]?.location?.message}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Start Date"
                placeholder="MM/YYYY"
                required
                {...register(`education.${index}.startDate`)}
                error={errors.education?.[index]?.startDate?.message}
              />
              <FormInput
                label="End Date"
                placeholder="MM/YYYY"
                required
                {...register(`education.${index}.endDate`)}
                error={errors.education?.[index]?.endDate?.message}
              />
            </div>
          </div>
        </div>
      ))}
      <button
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
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Plus size={16} /> Add Education
      </button>
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
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
          <div className="mb-4">
            <FormInput
              label="Category Name"
              required
              {...register(`skills.${index}.category`)}
              error={errors.skills?.[index]?.category?.message}
              placeholder="e.g., Technical Skills, Soft Skills, Languages"
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
      <button
        type="button"
        onClick={() =>
          appendSkill({
            category: "",
            items: [""],
          })
        }
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Plus size={16} /> Add Skill Category
      </button>
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
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              label="Project Title"
              {...register(`projects.${index}.title`)}
              error={errors.projects?.[index]?.title?.message}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Start Date"
                placeholder="MM/YYYY"
                {...register(`projects.${index}.startDate`)}
                error={errors.projects?.[index]?.startDate?.message}
              />
              <FormInput
                label="End Date"
                placeholder="MM/YYYY"
                {...register(`projects.${index}.endDate`)}
                error={errors.projects?.[index]?.endDate?.message}
              />
            </div>
          </div>
          <FormTextarea
            label="Project Description"
            {...register(`projects.${index}.description`)}
            error={errors.projects?.[index]?.description?.message}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendProject({
            title: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} /> Add Project
      </button>
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
            <button
              type="button"
              onClick={() => removeCertification(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Certification Name"
              {...register(`certifications.${index}.name`)}
              error={errors.certifications?.[index]?.name?.message}
            />
            <FormInput
              label="Issuing Organization"
              {...register(`certifications.${index}.issuingOrganization`)}
              error={
                errors.certifications?.[index]?.issuingOrganization?.message
              }
            />
            <FormInput
              label="Issue Date"
              placeholder="MM/YYYY"
              {...register(`certifications.${index}.issueDate`)}
              error={errors.certifications?.[index]?.issueDate?.message}
            />
            <FormInput
              label="Expiration Date (Optional)"
              placeholder="MM/YYYY"
              {...register(`certifications.${index}.expirationDate`)}
              error={errors.certifications?.[index]?.expirationDate?.message}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendCertification({
            name: "",
            issuingOrganization: "",
            issueDate: "",
            expirationDate: "",
          })
        }
        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} /> Add Certification
      </button>
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
            <button
              type="button"
              onClick={() => removeAward(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              label="Award Name"
              {...register(`awards.${index}.name`)}
              error={errors.awards?.[index]?.name?.message}
            />
            <FormInput
              label="Issuing Organization"
              {...register(`awards.${index}.issuingOrganization`)}
              error={errors.awards?.[index]?.issuingOrganization?.message}
            />
            <FormInput
              label="Date Received"
              placeholder="MM/YYYY"
              {...register(`awards.${index}.date`)}
              error={errors.awards?.[index]?.date?.message}
            />
          </div>
          <FormTextarea
            label="Description (Optional)"
            {...register(`awards.${index}.description`)}
            error={errors.awards?.[index]?.description?.message}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendAward({
            name: "",
            issuingOrganization: "",
            date: "",
            description: "",
          })
        }
        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} /> Add Award
      </button>
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
