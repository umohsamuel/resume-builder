interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedinUrl?: string;
  portfolioLink?: string;
}

interface Education {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate?: string;
}

interface WorkExperience {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
}

interface Project {
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Skill {
  category: string;
  items: string[];
}

interface Certification {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
}

interface Award {
  name: string;
  issuingOrganization: string;
  date: string;
  description?: string;
}

interface ResumeData {
  contactInfo: ContactInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  awards?: Award[];
}
