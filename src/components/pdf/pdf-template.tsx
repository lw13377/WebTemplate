import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { ResumeContent } from '@/types/resume'

// Register a web-safe font
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
    { src: 'Helvetica-Oblique', fontStyle: 'italic' },
  ],
})

interface PdfTemplateProps {
  content: ResumeContent
  themeColor: string
  fontFamily: string
}

export function PdfResumeDocument({ content, themeColor }: PdfTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 10,
      fontFamily: 'Helvetica',
      lineHeight: 1.5,
      color: '#1a1a1a',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,
    },
    contact: {
      fontSize: 9,
      textAlign: 'center',
      color: '#555555',
      marginBottom: 8,
    },
    hr: {
      borderBottomWidth: 2,
      borderBottomColor: themeColor,
      borderBottomStyle: 'solid',
      marginVertical: 8,
    },
    sectionHeading: {
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      color: themeColor,
      marginBottom: 4,
      paddingBottom: 3,
      borderBottomWidth: 1.5,
      borderBottomColor: themeColor,
      borderBottomStyle: 'solid',
      marginTop: 14,
    },
    entryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    entryTitle: {
      fontSize: 11,
      fontWeight: 'bold',
    },
    entrySubtitle: {
      fontSize: 10,
      fontStyle: 'italic',
      color: '#555555',
    },
    entryDate: {
      fontSize: 9,
      color: '#777777',
    },
    entryDescription: {
      marginTop: 3,
      color: '#333333',
      lineHeight: 1.6,
    },
    text: {
      color: '#333333',
      lineHeight: 1.6,
    },
    skillRow: {
      marginTop: 4,
      flexDirection: 'row',
    },
    skillCategory: {
      fontWeight: 'bold',
    },
    inline: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 4,
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {personal.name ? <Text style={styles.name}>{personal.name}</Text> : null}
        {contactParts.length > 0 && (
          <Text style={styles.contact}>{contactParts.join('  |  ')}</Text>
        )}
        <View style={styles.hr} />

        {/* Summary */}
        {summary ? (
          <View>
            <Text style={styles.sectionHeading}>Professional Summary</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {experience.length > 0 && (
          <View>
            <Text style={styles.sectionHeading}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id}>
                <View style={styles.entryRow}>
                  <View>
                    <Text style={styles.entryTitle}>{exp.title}</Text>
                    {exp.company && (
                      <Text style={styles.entrySubtitle}>
                        {exp.location ? `${exp.company}, ${exp.location}` : exp.company}
                      </Text>
                    )}
                  </View>
                  {(exp.startDate || exp.endDate) && (
                    <Text style={styles.entryDate}>
                      {exp.startDate}
                      {exp.startDate && exp.endDate ? ' - ' : ''}
                      {exp.endDate}
                    </Text>
                  )}
                </View>
                {exp.description ? (
                  <Text style={styles.entryDescription}>{exp.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View>
            <Text style={styles.sectionHeading}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id}>
                <View style={styles.entryRow}>
                  <View>
                    <Text style={styles.entryTitle}>{edu.degree}</Text>
                    {edu.school && (
                      <Text style={styles.entrySubtitle}>
                        {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                      </Text>
                    )}
                  </View>
                  {(edu.startDate || edu.endDate) && (
                    <Text style={styles.entryDate}>
                      {edu.startDate}
                      {edu.startDate && edu.endDate ? ' - ' : ''}
                      {edu.endDate}
                    </Text>
                  )}
                </View>
                {edu.gpa ? (
                  <Text style={{ marginTop: 2, color: '#555', fontSize: 9 }}>GPA: {edu.gpa}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.flatMap(s => s.items).length > 0 && (
          <View>
            <Text style={styles.sectionHeading}>Skills</Text>
            <View style={styles.skillRow}>
              <Text style={styles.text}>{skills.flatMap(s => s.items).join(', ')}</Text>
            </View>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View>
            <Text style={styles.sectionHeading}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginTop: 8 }}>
                <Text style={styles.entryTitle}>
                  {proj.name}
                  {proj.url ? ` — ${proj.url}` : ''}
                </Text>
                {proj.description ? (
                  <Text style={styles.entryDescription}>{proj.description}</Text>
                ) : null}
                {proj.technologies.length > 0 && (
                  <Text style={{ marginTop: 2, fontSize: 9, color: '#555' }}>
                    Technologies: {proj.technologies.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View>
            <Text style={styles.sectionHeading}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={{ marginTop: 4 }}>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={{ color: '#555' }}> - {cert.issuer}</Text> : null}
                  {cert.date ? <Text style={{ color: '#777', fontSize: 9 }}> ({cert.date})</Text> : null}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <View>
            <Text style={styles.sectionHeading}>Languages</Text>
            <View style={styles.inline}>
              <Text style={styles.text}>
                {languages
                  .map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`)
                  .join('  |  ')}
              </Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}
