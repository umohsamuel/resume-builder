export const contactInputs = [
  {
    label: "Full Name",
    name: ["contactInfo", "name"] as const,
    required: true,
  },
  {
    label: "Professional Title",
    name: ["contactInfo", "title"] as const,
    required: true,
  },
  {
    label: "Professional Email",
    name: ["contactInfo", "email"] as const,
    required: true,
    type: "email",
  },
  {
    label: "Phone Number",
    name: ["contactInfo", "phone"] as const,
    required: true,
  },
  {
    label: "City/State/Zip Code",
    name: ["contactInfo", "location"] as const,
    required: true,
  },
  { label: "Website", name: ["contactInfo", "website"] as const },
  { label: "LinkedIn URL", name: ["contactInfo", "linkedinUrl"] as const },
  { label: "Portfolio Link", name: ["contactInfo", "portfolioLink"] as const },
] as const;
