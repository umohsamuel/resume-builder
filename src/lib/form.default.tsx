export const defaultFormValues: ResumeData = {
  contactInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedinUrl: "",
    portfolioLink: "",
  },
  professionalSummary: "",
  workExperience: [
    {
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: [""],
    },
  ],
  education: [
    {
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
    },
  ],
  skills: [
    {
      category: "Technical Skills",
      items: [""],
    },
  ],
  projects: [
    {
      title: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  certifications: [
    {
      name: "",
      issuingOrganization: "",
      issueDate: "",
      expirationDate: "",
    },
  ],
  awards: [
    {
      name: "",
      issuingOrganization: "",
      date: "",
      description: "",
    },
  ],
};
