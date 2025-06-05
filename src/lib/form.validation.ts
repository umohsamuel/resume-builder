import { z } from "zod";

const mmYyyyRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
const yyyyMmRegex = /^\d{4}-(0[1-9]|1[0-2])$/;

const dateField = z
  .string()
  .refine((val) => mmYyyyRegex.test(val) || yyyyMmRegex.test(val), {
    message: "Date must be in MM/YYYY or YYYY-MM format",
  });

const contactInfoSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Professional title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(1, "Location is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  portfolioLink: z
    .string()
    .url("Invalid portfolio URL")
    .optional()
    .or(z.literal("")),
});

const workExperienceSchema = z.object({
  position: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Company location is required"),
  startDate: dateField,
  endDate: dateField.optional().or(z.literal("")),
  responsibilities: z
    .array(z.string().min(1, "Achievement cannot be empty"))
    .min(1, "At least one achievement is required"),
});

const educationSchema = z.object({
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree name is required"),
  location: z.string().min(1, "Institution location is required"),
  startDate: dateField,
  endDate: dateField.optional().or(z.literal("")),
});

const skillSchema = z.object({
  category: z.string().min(1, "Skill category is required"),
  items: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill is required"),
});

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  startDate: dateField,
  endDate: dateField.optional().or(z.literal("")),
  description: z.string().min(1, "Project description is required"),
});

const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuingOrganization: z.string().min(1, "Issuing organization is required"),
  issueDate: dateField,
  expirationDate: dateField.optional().or(z.literal("")),
});

const awardSchema = z.object({
  name: z.string().min(1, "Award name is required"),
  issuingOrganization: z.string().min(1, "Issuing organization is required"),
  date: dateField,
  description: z.string().optional(),
});

export const resumeSchema = z.object({
  contactInfo: contactInfoSchema,
  professionalSummary: z
    .string()
    .min(50, "Professional summary should be at least 50 characters"),
  workExperience: z
    .array(workExperienceSchema)
    .min(1, "At least one work experience is required"),
  education: z
    .array(educationSchema)
    .min(1, "At least one education entry is required"),
  skills: z
    .array(skillSchema)
    .min(1, "At least one skill category is required"),
  projects: z.array(projectSchema).optional().default([]),
  certifications: z.array(certificationSchema).optional().default([]),
  awards: z.array(awardSchema).optional().default([]),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
