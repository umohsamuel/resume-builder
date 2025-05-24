import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times-Roman",
    fontSize: 10,
    color: "#333",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 9,
    color: "#666",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    paddingBottom: 2,
    borderBottom: "1px solid #999",
  },
  subsection: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletPoint: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
  },
  skillCategory: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  skillItem: {
    marginRight: 10,
    marginBottom: 2,
  },
  summaryText: {
    lineHeight: 1.4,
  },
});

const Header: React.FC<{ contactInfo: ContactInfo }> = ({ contactInfo }) => (
  <View style={styles.header}>
    <Text style={styles.name}>{contactInfo.name}</Text>
    <Text style={styles.title}>{contactInfo.title}</Text>
    <View style={styles.contactInfo}>
      {/* <Text>
        {contactInfo.email} | {contactInfo.website}
      </Text> */}
      <Text>
        <Link src={`mailto:${contactInfo.email}`}>Mail</Link> |{" "}
        <Link src={contactInfo.website}>Website</Link> |{" "}
        <Link src={contactInfo.portfolioLink}>Portfiolio</Link> |{" "}
        <Link src={contactInfo.linkedinUrl}>LinkedIn</Link>
      </Text>
      <Text>
        {contactInfo.location} | {contactInfo.phone}
      </Text>
    </View>
  </View>
);

const ProfessionalSummary: React.FC<{ summary: string }> = ({ summary }) => (
  <View style={styles.section}>
    <Text style={styles.summaryText}>{summary}</Text>
  </View>
);

const EducationSection: React.FC<{ education: Education[] }> = ({
  education,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Education</Text>
    {education.map((edu, index) => (
      <View key={index} style={styles.subsection}>
        <View style={styles.row}>
          <Text style={styles.bold}>{edu.institution}</Text>
          <Text>
            {edu.startDate} - {edu.endDate}
          </Text>
        </View>
        <Text style={styles.italic}>{edu.degree}</Text>
      </View>
    ))}
  </View>
);

const ProjectsSection: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Projects</Text>
    {projects.map((project, index) => (
      <View key={index} style={styles.subsection}>
        <View style={styles.row}>
          <Text style={styles.bold}>{project.title}</Text>
          <Text>
            {project.startDate} - {project.endDate}
          </Text>
        </View>
        <Text>{project.description}</Text>
      </View>
    ))}
  </View>
);

const WorkExperienceSection: React.FC<{ workExperience: WorkExperience[] }> = ({
  workExperience,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Work Experience</Text>
    {workExperience.map((work, index) => (
      <View key={index} style={styles.subsection}>
        <View style={styles.row}>
          <Text style={styles.bold}>{work.position}</Text>
          <Text>
            {work.startDate} - {work.endDate}
          </Text>
        </View>
        <Text style={styles.italic}>
          {work.company} | {work.location}
        </Text>
        {work.responsibilities.map((responsibility, rIndex) => (
          <View key={rIndex} style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>{responsibility}</Text>
          </View>
        ))}
      </View>
    ))}
  </View>
);

const SkillsSection: React.FC<{ skills: Skill[] }> = ({ skills }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Skills</Text>
    {skills.map((skillGroup, index) => (
      <View key={index} style={styles.subsection}>
        <Text style={styles.skillCategory}>{skillGroup.category}:</Text>
        <View style={styles.skillList}>
          {skillGroup.items.map((skill, sIndex) => (
            <Text key={sIndex} style={styles.skillItem}>
              {skill}
            </Text>
          ))}
        </View>
      </View>
    ))}
  </View>
);

const CertificationSection: React.FC<{ certifications: Certification[] }> = ({
  certifications,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Certifications</Text>
    {certifications.map((cert, index) => (
      <View key={index} style={styles.subsection}>
        <View style={styles.row}>
          <Text style={styles.bold}>{cert.name}</Text>
          <Text>
            {cert.issueDate}
            {cert.expirationDate ? ` - ${cert.expirationDate}` : ""}
          </Text>
        </View>
        <Text>{cert.issuingOrganization}</Text>
      </View>
    ))}
  </View>
);

const AwardsSection: React.FC<{ awards: Award[] }> = ({ awards }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Awards</Text>
    {awards.map((award, index) => (
      <View key={index} style={styles.subsection}>
        <View style={styles.row}>
          <Text style={styles.bold}>{award.name}</Text>
          <Text>{award.date}</Text>
        </View>
        <Text>{award.issuingOrganization}</Text>
        {award.description && (
          <Text style={{ marginTop: 2 }}>{award.description}</Text>
        )}
      </View>
    ))}
  </View>
);

const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Header contactInfo={data.contactInfo} />
      <ProfessionalSummary summary={data.professionalSummary} />
      <EducationSection education={data.education} />
      <WorkExperienceSection workExperience={data.workExperience} />
      <SkillsSection skills={data.skills} />
      {data.projects && <ProjectsSection projects={data.projects} />}
      {data.certifications && (
        <CertificationSection certifications={data.certifications} />
      )}
      {data.awards && <AwardsSection awards={data.awards} />}
    </Page>
  </Document>
);

export default ResumePDF;
