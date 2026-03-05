import React from 'react'
import type { TemplateProps } from '@/components/templates/base-styles'
import { pageContainerStyle } from '@/components/templates/base-styles'

export default function CleanTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  const dividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: '0.5px solid #d4d4d4',
    margin: '0',
  }

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.2px',
    color: themeColor,
    margin: '0 0 8px 0',
    paddingTop: '16px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '48px 48px',
        lineHeight: 1.5,
        fontSize: '10px',
      }}
    >
      {/* Header */}
      {personal.name && (
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 500,
            margin: '0 0 6px 0',
            color: themeColor,
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
            color: '#888',
            marginBottom: '20px',
          }}
        >
          {contactParts.join('  |  ')}
        </div>
      )}

      <hr style={dividerStyle} />

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeadingStyle}>Summary</h2>
          <p style={{ margin: '0', color: '#444', lineHeight: 1.6 }}>{summary}</p>
          <hr style={{ ...dividerStyle, marginTop: '14px' }} />
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? '12px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                {(exp.startDate || exp.endDate) && (
                  <span style={{ fontSize: '9px', color: '#999', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                  </span>
                )}
              </div>
              {exp.company && (
                <div style={{ fontSize: '10px', color: '#666', marginTop: '1px' }}>
                  {exp.location ? `${exp.company}, ${exp.location}` : exp.company}
                </div>
              )}
              {exp.description && (
                <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {exp.description}
                </div>
              )}
            </div>
          ))}
          <hr style={{ ...dividerStyle, marginTop: '14px' }} />
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Education</h2>
          {education.map((edu, i) => (
            <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '10px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '9px', color: '#999', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                  </span>
                )}
              </div>
              {edu.school && (
                <div style={{ fontSize: '10px', color: '#666', marginTop: '1px' }}>
                  {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                </div>
              )}
              {edu.gpa && (
                <div style={{ marginTop: '2px', color: '#777', fontSize: '9px' }}>GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
          <hr style={{ ...dividerStyle, marginTop: '14px' }} />
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ color: '#444' }}>
            {allSkills.join(', ')}
          </div>
          <hr style={{ ...dividerStyle, marginTop: '14px' }} />
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '10px' : '0' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                {proj.url && (
                  <span style={{ color: '#999', marginLeft: '8px', fontSize: '9px' }}>{proj.url}</span>
                )}
              </div>
              {proj.description && (
                <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6 }}>{proj.description}</div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ marginTop: '3px', fontSize: '9px', color: '#777' }}>
                  {proj.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
          <hr style={{ ...dividerStyle, marginTop: '14px' }} />
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#666' }}> - {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#999', marginLeft: '6px', fontSize: '9px' }}>({cert.date})</span>}
            </div>
          ))}
          <hr style={{ ...dividerStyle, marginTop: '14px' }} />
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Languages</h2>
          <div style={{ color: '#444' }}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{lang.language}</span>
                {lang.proficiency && <span style={{ color: '#666' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && '  |  '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
