import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import type { ResumeContent } from '@/types/resume'

function isHidden(content: ResumeContent, section: string): boolean {
  return content.hiddenSections?.includes(section) ?? false
}

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

  const s = StyleSheet.create({
    page: {
      paddingTop: 28,
      paddingBottom: 28,
      paddingHorizontal: 32,
      fontSize: 9,
      fontFamily: 'Helvetica',
      lineHeight: 1.35,
      color: '#222',
    },
    // Header
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#111',
      marginBottom: 2,
    },
    title: {
      fontSize: 9.5,
      textAlign: 'center',
      color: themeColor,
      marginBottom: 3,
    },
    contact: {
      fontSize: 8,
      textAlign: 'center',
      color: '#555',
      marginBottom: 6,
    },
    headerLine: {
      borderBottomWidth: 1.5,
      borderBottomColor: themeColor,
      borderBottomStyle: 'solid',
      marginBottom: 6,
    },
    // Sections
    sectionHeading: {
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: themeColor,
      marginTop: 7,
      marginBottom: 3,
      paddingBottom: 2,
      borderBottomWidth: 0.75,
      borderBottomColor: '#ddd',
      borderBottomStyle: 'solid',
    },
    // Entries
    entryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: 4,
    },
    entryTitle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#111',
    },
    entryCompany: {
      fontSize: 9,
      color: '#444',
    },
    entryDate: {
      fontSize: 8,
      color: '#666',
      textAlign: 'right',
      minWidth: 80,
    },
    entryDesc: {
      fontSize: 8.5,
      marginTop: 2,
      color: '#333',
      lineHeight: 1.4,
    },
    // Skills
    skillText: {
      fontSize: 9,
      color: '#333',
      marginTop: 2,
      lineHeight: 1.4,
    },
    // Inline items
    inlineText: {
      fontSize: 8.5,
      color: '#333',
      marginTop: 2,
    },
    // Summary
    summaryText: {
      fontSize: 9,
      color: '#333',
      lineHeight: 1.45,
      marginTop: 1,
    },
  })

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        {personal.name && <Text style={s.name}>{personal.name}</Text>}
        {contactParts.length > 0 && (
          <Text style={s.contact}>{contactParts.join('  •  ')}</Text>
        )}
        <View style={s.headerLine} />

        {/* Summary */}
        {summary && !isHidden(content, 'summary') && (
          <View>
            <Text style={s.sectionHeading}>Summary</Text>
            <Text style={s.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && !isHidden(content, 'experience') && (
          <View>
            <Text style={s.sectionHeading}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} wrap={false}>
                <View style={s.entryRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.entryTitle}>{exp.title}</Text>
                    {exp.company && (
                      <Text style={s.entryCompany}>
                        {exp.company}{exp.location ? `, ${exp.location}` : ''}
                      </Text>
                    )}
                  </View>
                  {(exp.startDate || exp.endDate) && (
                    <Text style={s.entryDate}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                    </Text>
                  )}
                </View>
                {exp.description && <Text style={s.entryDesc}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && !isHidden(content, 'education') && (
          <View>
            <Text style={s.sectionHeading}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} wrap={false}>
                <View style={s.entryRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.entryTitle}>{edu.degree}</Text>
                    {edu.school && (
                      <Text style={s.entryCompany}>
                        {edu.school}{edu.location ? `, ${edu.location}` : ''}
                      </Text>
                    )}
                  </View>
                  {(edu.startDate || edu.endDate) && (
                    <Text style={s.entryDate}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                    </Text>
                  )}
                </View>
                {edu.gpa && (
                  <Text style={{ fontSize: 8, color: '#555', marginTop: 1 }}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.flatMap(g => g.items).length > 0 && !isHidden(content, 'skills') && (
          <View>
            <Text style={s.sectionHeading}>Skills</Text>
            <Text style={s.skillText}>
              {skills.flatMap(g => g.items).join('  •  ')}
            </Text>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && !isHidden(content, 'projects') && (
          <View>
            <Text style={s.sectionHeading}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} wrap={false} style={{ marginTop: 3 }}>
                <Text style={s.entryTitle}>
                  {proj.name}{proj.url ? `  —  ${proj.url}` : ''}
                </Text>
                {proj.description && <Text style={s.entryDesc}>{proj.description}</Text>}
                {proj.technologies.length > 0 && (
                  <Text style={{ fontSize: 8, color: '#555', marginTop: 1 }}>
                    {proj.technologies.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && !isHidden(content, 'certifications') && (
          <View>
            <Text style={s.sectionHeading}>Certifications</Text>
            {certifications.map((cert) => (
              <View key={cert.id} wrap={false} style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 9 }}>
                  <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                  {cert.issuer ? <Text style={{ color: '#444' }}> — {cert.issuer}</Text> : null}
                  {cert.date ? <Text style={{ color: '#666', fontSize: 8 }}>  ({cert.date})</Text> : null}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && !isHidden(content, 'languages') && (
          <View>
            <Text style={s.sectionHeading}>Languages</Text>
            <Text style={s.inlineText}>
              {languages
                .map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`)
                .join('  •  ')}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  )
}
