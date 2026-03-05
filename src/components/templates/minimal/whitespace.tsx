import React from 'react'
import type { TemplateProps } from '@/components/templates/base-styles'
import { pageContainerStyle } from '@/components/templates/base-styles'

export default function WhitespaceTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    color: themeColor,
    margin: '0',
    paddingTop: '32px',
    paddingBottom: '10px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '52px 50px',
        lineHeight: 1.6,
        fontSize: '10px',
      }}
    >
      {/* Header */}
      {personal.name && (
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 600,
            margin: '0',
            color: '#1a1a1a',
            textAlign: 'center',
          }}
        >
          {personal.name}
        </h1>
      )}

      {contactParts.length > 0 && (
        <div
          style={{
            textAlign: 'center',
            fontSize: '9px',
            color: '#999',
            marginTop: '10px',
            letterSpacing: '0.5px',
          }}
        >
          {contactParts.join('     ')}
        </div>
      )}

      {/* Large breathing room after header */}
      <div style={{ height: '36px' }} />

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeadingStyle}>Summary</h2>
          <p style={{ margin: '0', color: '#444', lineHeight: 1.7 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? '20px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                {(exp.startDate || exp.endDate) && (
                  <span style={{ fontSize: '9px', color: '#aaa', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                  </span>
                )}
              </div>
              {exp.company && (
                <div style={{ fontSize: '10px', color: '#777', marginTop: '3px' }}>
                  {exp.location ? `${exp.company}, ${exp.location}` : exp.company}
                </div>
              )}
              {exp.description && (
                <div style={{ marginTop: '6px', color: '#444', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Education</h2>
          {education.map((edu, i) => (
            <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '18px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '9px', color: '#aaa', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                  </span>
                )}
              </div>
              {edu.school && (
                <div style={{ fontSize: '10px', color: '#777', marginTop: '3px' }}>
                  {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                </div>
              )}
              {edu.gpa && (
                <div style={{ marginTop: '3px', color: '#999', fontSize: '9px' }}>GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ color: '#555' }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '18px' : '0' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                {proj.url && (
                  <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '9px' }}>{proj.url}</span>
                )}
              </div>
              {proj.description && (
                <div style={{ marginTop: '5px', color: '#444', lineHeight: 1.7 }}>{proj.description}</div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ marginTop: '4px', fontSize: '9px', color: '#999' }}>
                  {proj.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#777' }}> - {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#aaa', marginLeft: '8px', fontSize: '9px' }}>({cert.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Languages</h2>
          <div style={{ color: '#555' }}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{lang.language}</span>
                {lang.proficiency && <span style={{ color: '#777' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && '     '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
