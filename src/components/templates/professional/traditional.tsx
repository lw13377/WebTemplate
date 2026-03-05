import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle } from '../base-styles'

export default function TraditionalTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const rightContactParts: string[] = []
  if (personal.email) rightContactParts.push(personal.email)
  if (personal.phone) rightContactParts.push(personal.phone)
  if (personal.location) rightContactParts.push(personal.location)

  const bottomContactParts: string[] = []
  if (personal.website) bottomContactParts.push(personal.website)
  if (personal.linkedin) bottomContactParts.push(personal.linkedin)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    color: '#1a1a1a',
    marginBottom: '4px',
    marginTop: '14px',
    paddingBottom: '2px',
    borderBottom: `1.5px solid ${themeColor}`,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", "Times New Roman", serif`,
        padding: '32px 38px',
        lineHeight: 1.4,
        fontSize: '10.5px',
      }}
    >
      {/* Header: Name left, contact right */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: Name */}
        <div>
          {personal.name && (
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                margin: 0,
                color: '#1a1a1a',
              }}
            >
              {personal.name}
            </h1>
          )}
          {bottomContactParts.length > 0 && (
            <div style={{ fontSize: '9.5px', color: '#666', marginTop: '2px' }}>
              {bottomContactParts.join('  |  ')}
            </div>
          )}
        </div>

        {/* Right: Contact info */}
        {rightContactParts.length > 0 && (
          <div style={{ textAlign: 'right', fontSize: '10px', color: '#555', paddingTop: '4px' }}>
            {rightContactParts.map((part, i) => (
              <div key={i} style={{ marginBottom: '1px' }}>
                {part}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Thin line under header */}
      <div
        style={{
          height: '2px',
          backgroundColor: themeColor,
          marginTop: '8px',
        }}
      />

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={sectionHeadingStyle}>Summary</h2>
          <p style={{ margin: '4px 0 0 0', color: '#333', lineHeight: 1.5 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                  {exp.company && (
                    <span style={{ color: '#444', marginLeft: '4px' }}>
                      -- {exp.company}
                      {exp.location && `, ${exp.location}`}
                    </span>
                  )}
                </div>
                {(exp.startDate || exp.endDate) && (
                  <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                  </span>
                )}
              </div>
              {exp.description && (
                <div style={{ marginTop: '3px', color: '#333', lineHeight: 1.5, whiteSpace: 'pre-line', paddingLeft: '8px' }}>
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
            <div key={edu.id} style={{ marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {edu.school && (
                    <span style={{ color: '#444', marginLeft: '4px' }}>
                      -- {edu.school}
                      {edu.location && `, ${edu.location}`}
                    </span>
                  )}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '10px', color: '#777', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                  </span>
                )}
              </div>
              {edu.gpa && (
                <div style={{ fontSize: '10px', color: '#555', marginTop: '1px', paddingLeft: '8px' }}>
                  GPA: {edu.gpa}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills - compact, inline */}
      {allSkills.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ marginTop: '4px', color: '#333' }}>
            {allSkills.join(', ')}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                {proj.url && (
                  <span style={{ color: themeColor, fontSize: '9.5px', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                    {proj.url}
                  </span>
                )}
              </div>
              {proj.description && (
                <div style={{ marginTop: '2px', color: '#333', lineHeight: 1.5, paddingLeft: '8px' }}>
                  {proj.description}
                </div>
              )}
              {proj.technologies.length > 0 && (
                <div style={{ marginTop: '2px', fontSize: '9.5px', color: '#555', paddingLeft: '8px' }}>
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
            <div key={cert.id} style={{ marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{cert.name}</span>
                {cert.issuer && <span style={{ color: '#555' }}> -- {cert.issuer}</span>}
              </div>
              {cert.date && <span style={{ color: '#777', fontSize: '10px', whiteSpace: 'nowrap' }}>{cert.date}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Languages</h2>
          <div style={{ marginTop: '4px', color: '#333' }}>
            {languages.map((lang, i) => (
              <span key={lang.id}>
                <span style={{ fontWeight: 600 }}>{lang.language}</span>
                {lang.proficiency && <span style={{ color: '#555' }}> ({lang.proficiency})</span>}
                {i < languages.length - 1 && ',  '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
