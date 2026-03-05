import React from 'react'
import type { TemplateProps } from '../base-styles'
import { hexToRgb, lightenColor, pageContainerStyle } from '../base-styles'

export default function GridTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)
  const rgb = hexToRgb(themeColor)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: '0',
  }

  const cardStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderRadius: '6px',
    border: `1px solid ${lightenColor(themeColor, 0.82)}`,
    backgroundColor: '#ffffff',
    marginBottom: '10px',
  }

  const cardWithTopBorder: React.CSSProperties = {
    ...cardStyle,
    borderTop: `3px solid ${themeColor}`,
  }

  const chipStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '4px',
    fontSize: '8.5px',
    fontWeight: 500,
    backgroundColor: lightenColor(themeColor, 0.92),
    color: '#333',
    marginRight: '4px',
    marginBottom: '4px',
  }

  const contactParts: { label: string; value: string }[] = []
  if (personal.email) contactParts.push({ label: 'Email', value: personal.email })
  if (personal.phone) contactParts.push({ label: 'Phone', value: personal.phone })
  if (personal.location) contactParts.push({ label: 'Location', value: personal.location })
  if (personal.website) contactParts.push({ label: 'Web', value: personal.website })
  if (personal.linkedin) contactParts.push({ label: 'LinkedIn', value: personal.linkedin })

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.5,
        fontSize: '10px',
      }}
    >
      {/* Grid Header */}
      <div
        style={{
          padding: '28px 36px',
          backgroundColor: lightenColor(themeColor, 0.95),
          borderBottom: `2px solid ${themeColor}`,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: contactParts.length > 0 ? '1fr 1fr' : '1fr',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          {/* Name block */}
          <div>
            {personal.name && (
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  margin: 0,
                  color: '#1a1a1a',
                  letterSpacing: '0.5px',
                }}
              >
                {personal.name}
              </h1>
            )}
          </div>

          {/* Contact grid */}
          {contactParts.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: contactParts.length > 2 ? '1fr 1fr' : '1fr',
                gap: '4px 16px',
              }}
            >
              {contactParts.map((cp, i) => (
                <div key={i} style={{ fontSize: '9px', color: '#555' }}>
                  <span style={{ fontWeight: 600, color: themeColor, marginRight: '4px' }}>{cp.label}:</span>
                  <span style={{ wordBreak: 'break-all' as const }}>{cp.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 36px 32px 36px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '14px' }}>
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.04)`,
                borderRadius: '6px',
                borderLeft: `3px solid ${themeColor}`,
              }}
            >
              <p style={{ margin: 0, color: '#444', lineHeight: 1.65, fontSize: '10px' }}>{summary}</p>
            </div>
          </div>
        )}

        {/* Experience as cards */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '6px' }}>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={cardWithTopBorder}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap' }}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '2px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#888', fontWeight: 400 }}> | {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education as cards */}
        {education.length > 0 && (
          <div style={{ marginBottom: '6px' }}>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap' }}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '2px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#888', fontWeight: 400 }}> | {edu.location}</span>}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ marginTop: '2px', color: '#666', fontSize: '9.5px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills as chip grid */}
        {allSkills.length > 0 && (
          <div style={{ marginBottom: '6px' }}>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={cardStyle}>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {allSkills.map((skill, i) => (
                  <span key={i} style={chipStyle}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects as cards */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '6px' }}>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={cardWithTopBorder}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '8px', fontSize: '9px' }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#444', lineHeight: 1.6 }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap' }}>
                    {proj.technologies.map((tech, i) => (
                      <span key={i} style={chipStyle}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Two-column grid for Languages & Certifications */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: certifications.length > 0 && languages.length > 0 ? '1fr 1fr' : '1fr',
              gap: '16px',
            }}
          >
            {certifications.length > 0 && (
              <div>
                <h2 style={sectionHeadingStyle}>Certifications</h2>
                <div style={cardStyle}>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ marginBottom: '6px' }}>
                      <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '10px' }}>{cert.name}</div>
                      {cert.issuer && (
                        <div style={{ fontSize: '9px', color: '#666', marginTop: '1px' }}>{cert.issuer}</div>
                      )}
                      {cert.date && (
                        <div style={{ fontSize: '8.5px', color: '#888', marginTop: '1px' }}>{cert.date}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h2 style={sectionHeadingStyle}>Languages</h2>
                <div style={cardStyle}>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '10px' }}>{lang.language}</span>
                      {lang.proficiency && (
                        <span style={chipStyle}>{lang.proficiency}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
