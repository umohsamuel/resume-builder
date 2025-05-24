import type { FieldValues, Path } from "react-hook-form";

interface FormInputType<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  placeholder: string;
  required?: boolean;
}

export const contactInputs = [
  {
    label: "Full Name",
    type: "text",
    name: "contactInfo.name",
    placeholder: "Enter Full Name",
    required: true,
  },
  {
    label: "Professional Title",
    type: "text",
    name: "contactInfo.title",
    placeholder: "Enter Professional Title",
    required: true,
  },
  {
    label: "Professional Email",
    type: "email",
    name: "contactInfo.email",
    placeholder: "Enter Professional Email",
    required: true,
  },
  {
    label: "Phone Number",
    type: "text",
    name: "contactInfo.phone",
    placeholder: "Enter Phone Number",
    required: true,
  },
  {
    label: "City/State/Zip Code",
    type: "text",
    name: "contactInfo.location",
    placeholder: "Enter City/State/Zip Code",
    required: true,
  },
  {
    label: "Website",
    type: "url",
    name: "contactInfo.website",
    placeholder: "Enter Website URL",
  },
  {
    label: "LinkedIn URL",
    type: "url",
    name: "contactInfo.linkedinUrl",
    placeholder: "Enter LinkedIn URL",
  },
  {
    label: "Portfolio Link",
    type: "url",
    name: "contactInfo.portfolioLink",
    placeholder: "Enter Portfolio Link",
  },
] satisfies FormInputType<ResumeData>[];

// ----------------------------------------------------------------------------------------

export const workExperienceInputs = (index: number) =>
  [
    {
      label: "Job Title",
      type: "text",
      name: `workExperience.${index}.position`,
      placeholder: "Enter Job Title",
      required: true,
    },
    {
      label: "Company Name",
      type: "text",
      name: `workExperience.${index}.company`,
      placeholder: "Enter Company Name",
      required: true,
    },
    {
      label: "Company Location",
      type: "text",
      name: `workExperience.${index}.location`,
      placeholder: "Enter Company Location",
      required: true,
    },
    {
      label: "Start Date",
      type: "month",
      name: `workExperience.${index}.startDate`,
      placeholder: "MM/YYYY",
      required: true,
    },
    {
      label: "End Date",
      type: "month",
      name: `workExperience.${index}.endDate`,
      placeholder: "MM/YYYY",
      required: true,
    },
  ] satisfies FormInputType<ResumeData>[];

// --------------------------------------------------------------------------------

export const educationInputs = (index: number) =>
  [
    {
      label: "Degree Name",
      type: "text",
      name: `education.${index}.degree`,
      placeholder: "Enter Degree Name",
      required: true,
    },
    {
      label: "Institution Name",
      type: "text",
      name: `education.${index}.institution`,
      placeholder: "Enter Institution Name",
      required: true,
    },
    {
      label: "Institution Location",
      type: "text",
      name: `education.${index}.location`,
      placeholder: "Enter Institution Location",
      required: true,
    },
    {
      label: "Start Date",
      type: "month",
      name: `education.${index}.startDate`,
      placeholder: "MM/YYYY",
      required: true,
    },
    {
      label: "End Date",
      type: "month",
      name: `education.${index}.endDate`,
      placeholder: "MM/YYYY",
      required: true,
    },
  ] satisfies FormInputType<ResumeData>[];

// ------------------------------------------------------------------------------

export const projectInputs = (index: number) =>
  [
    {
      label: "Project Title",
      type: "text",
      name: `projects.${index}.title`,
      placeholder: "Enter Project Title",
      required: false,
    },
    {
      label: "Start Date",
      type: "month",
      name: `projects.${index}.startDate`,
      placeholder: "MM/YYYY",
      required: false,
    },
    {
      label: "End Date",
      type: "month",
      name: `projects.${index}.endDate`,
      placeholder: "MM/YYYY",
      required: false,
    },
    {
      label: "Project Description",
      type: "textarea",
      name: `projects.${index}.description`,
      placeholder: "Describe the project briefly",
      required: false,
    },
  ] satisfies FormInputType<ResumeData>[];

// -------------------------------------------------------------------------------------

export const certificationInputs = (index: number) =>
  [
    {
      label: "Certification Name",
      type: "text",
      name: `certifications.${index}.name`,
      placeholder: "Enter Certification Name",
      required: false,
    },
    {
      label: "Issuing Organization",
      type: "text",
      name: `certifications.${index}.issuingOrganization`,
      placeholder: "Enter Issuing Organization",
      required: false,
    },
    {
      label: "Issue Date",
      type: "month",
      name: `certifications.${index}.issueDate`,
      placeholder: "MM/YYYY",
      required: false,
    },
    {
      label: "Expiration Date (Optional)",
      type: "month",
      name: `certifications.${index}.expirationDate`,
      placeholder: "MM/YYYY",
      required: false,
    },
  ] satisfies FormInputType<ResumeData>[];

// ---------------------------------------------------------------------------------

export const awardInputs = (index: number) =>
  [
    {
      label: "Award Name",
      type: "text",
      name: `awards.${index}.name`,
      placeholder: "Enter Award Name",
      required: false,
    },
    {
      label: "Issuing Organization",
      type: "text",
      name: `awards.${index}.issuingOrganization`,
      placeholder: "Enter Issuing Organization",
      required: false,
    },
    {
      label: "Date Received",
      type: "month",
      name: `awards.${index}.date`,
      placeholder: "MM/YYYY",
      required: false,
    },
  ] satisfies FormInputType<ResumeData>[];

// type BaseInput = {
//   label: string;
//   name: ContactInputName;
//   placeholder: string;
//   required: boolean;
// };

// type TextInput = BaseInput & {
//   type: "text" | "email" | "tel";
// };

// type TextareaInput = BaseInput & {
//   type: "textarea";
// };

// type SelectInput = BaseInput & {
//   type: "select";
//   options: { label: string; value: string }[];
// };

// export type ContactInput = TextInput | TextareaInput | SelectInput;

// export type Path<T> = T extends object
//   ? {
//       [K in keyof T & (string | number)]: T[K] extends Array<infer U>
//         ? `${K}` | `${K}.${number}` | `${K}.${number}.${Path<U>}`
//         : T[K] extends object
//         ? `${K}` | `${K}.${Path<T[K]>}`
//         : `${K}`;
//     }[keyof T & (string | number)]
//   : never;

// export type ContactInputName = Path<ResumeData> extends infer T
//   ? T extends `contactInfo.${string}`
//     ? T
//     : never
//   : never;

// export type ContactInputs = Record<ContactInputName, string>;
