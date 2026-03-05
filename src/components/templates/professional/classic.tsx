import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'

export default function ClassicTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    marginBottom: '4px',
    paddingBottom: '4px',
    borderBottom: `1.5px solid ${themeColor}`,
    marginTop: '16px',
  }

  const hrStyle: React.CSSProperties = {
    border: 'none',
    borderTop: `2px solid ${themeColor}`,
    margin: '10px 0 0 0',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", serif`,
        padding: '40px 44px',
        lineHeight: 1.45,
        fontSize: '10.5px',
      }}
    >
      {/* Header */}
      {personal.name && (
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 700,
              margin: 0,
              color: '#1a1a1a',
              letterSpacing: '0.5px',
            }}
          >
            {personal.name}
          </h1>
        </div>
      )}

      {contactParts.length > 0 && (
        <div
          style={{
            textAlign: 'center',
            fontSize: '10px',
            color: '#555',
            marginTop: '6px',
          }}
        >
          {contactParts.join('  |  ')}
        </div>
      )}

      <hr style={hrStyle} />

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeadingStyle}>Professional Summary</h2>
          <p style={{ margin: '6px 0 0 0', color: '#333', lineHeight: 1.55 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{exp.title}</span>
                  {exp.company && (
                    <span style={{ fontStyle: 'italic', color: '#555', marginLeft: '6px' }}>
                      {exp.location ? `${exp.company}, ${exp.location}` : exp.company}
                    </span>
                  )}
                </div>
                {(exp.startDate || exp.endDate) && (
                  <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                  </span>
                )}
              </div>
              {exp.description && (
                <div style={{ marginTop: '4px', color: '#333', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
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
          {education.map((edu) => (
            <div key={edu.id} style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {edu.school && (
                    <span style={{ fontStyle: 'italic', color: '#555', marginLeft: '6px' }}>
                      {edu.location ? `${edu.school}, ${edu.location}` : edu.school}
                    </span>
                  )}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                  </span>
                )}
              </div>
              {edu.gpa && (
                <div style={{ marginTop: '2px', color: '#555', fontSize: '10px' }}>GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {allSkills.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ marginTop: '6px', color: '#333' }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginTop: '10px' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#1a1a1a' }}>{proj.name}</span>
                {proj.url && (
                  <span style={{ color: themeColor, marginLeft: '8px', fontSize: '10px' }}>{proj.url}</span>
                )}
              </div>
              {proj.description && (
                <div style={{ marginTop: '3px', color: '#333', lineHeight: 1.55 }}>{proj.description}</div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ marginTop: '3px', fontSize: '10px', color: '#555' }}>
                  Technologies: {proj.technologies.join(', ')}
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
            <div key={cert.id} style={{ marginTop: '6px' }}>
              <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#555' }}> - {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#777', marginLeft: '8px', fontSize: '10px' }}>({cert.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Languages</h2>
          <div style={{ marginTop: '6px', color: '#333' }}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600 }}>{lang.language}</span>
                {lang.proficiency && <span style={{ color: '#555' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && '  |  '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
