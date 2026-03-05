import React from 'react'
import type { TemplateProps } from '../base-styles'
import { lightenColor, pageContainerStyle } from '../base-styles'

export default function TimelineTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: themeColor,
    marginBottom: '12px',
    marginTop: '22px',
  }

  const timelineDotStyle: React.CSSProperties = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: themeColor,
    border: `2px solid ${lightenColor(themeColor, 0.6)}`,
    flexShrink: 0,
    position: 'relative' as const,
    zIndex: 1,
  }

  const timelineLineStyle: React.CSSProperties = {
    position: 'absolute' as const,
    left: '4px',
    top: '0',
    bottom: '0',
    width: '2px',
    backgroundColor: lightenColor(themeColor, 0.75),
  }

  const datePillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '8.5px',
    fontWeight: 600,
    backgroundColor: lightenColor(themeColor, 0.88),
    color: themeColor,
    whiteSpace: 'nowrap' as const,
    marginBottom: '3px',
  }

  const skillTagStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '14px',
    fontSize: '9px',
    fontWeight: 500,
    backgroundColor: lightenColor(themeColor, 0.9),
    color: '#333',
    marginRight: '5px',
    marginBottom: '5px',
    border: `1px solid ${lightenColor(themeColor, 0.7)}`,
  }

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '36px 44px 40px 44px',
        lineHeight: 1.5,
        fontSize: '10px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '8px' }}>
        {personal.name && (
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
        )}
        {contactParts.length > 0 && (
          <div
            style={{
              marginTop: '8px',
              fontSize: '9.5px',
              color: '#666',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px 14px',
            }}
          >
            {contactParts.map((part, i) => (
              <span key={i}>{part}</span>
            ))}
          </div>
        )}
        <div style={{ height: '2px', backgroundColor: themeColor, marginTop: '14px', borderRadius: '1px' }} />
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginTop: '12px' }}>
          <p style={{ margin: 0, color: '#444', lineHeight: 1.65, fontSize: '10px', fontStyle: 'italic' }}>{summary}</p>
        </div>
      )}

      {/* Experience Timeline */}
      {experience.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Experience</h2>
          <div style={{ position: 'relative' as const, paddingLeft: '24px' }}>
            {/* Timeline line */}
            <div style={timelineLineStyle} />
            {experience.map((exp, index) => (
              <div
                key={exp.id}
                style={{
                  position: 'relative' as const,
                  marginBottom: index < experience.length - 1 ? '16px' : '0',
                  paddingLeft: '0',
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: 'absolute' as const,
                    left: '-24px',
                    top: '2px',
                    ...timelineDotStyle,
                  }}
                />
                {/* Date pill */}
                {(exp.startDate || exp.endDate) && (
                  <div>
                    <span style={datePillStyle}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                    </span>
                  </div>
                )}
                <div style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a', marginTop: '2px' }}>
                  {exp.title}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#888', fontWeight: 400 }}>, {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Timeline */}
      {education.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Education</h2>
          <div style={{ position: 'relative' as const, paddingLeft: '24px' }}>
            <div style={timelineLineStyle} />
            {education.map((edu, index) => (
              <div
                key={edu.id}
                style={{
                  position: 'relative' as const,
                  marginBottom: index < education.length - 1 ? '14px' : '0',
                }}
              >
                <div
                  style={{
                    position: 'absolute' as const,
                    left: '-24px',
                    top: '2px',
                    ...timelineDotStyle,
                  }}
                />
                {(edu.startDate || edu.endDate) && (
                  <div>
                    <span style={datePillStyle}>
                      {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                    </span>
                  </div>
                )}
                <div style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a', marginTop: '2px' }}>
                  {edu.degree}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#888', fontWeight: 400 }}>, {edu.location}</span>}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ marginTop: '2px', color: '#666', fontSize: '9.5px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills grid of tags */}
      {allSkills.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {allSkills.map((skill, i) => (
              <span key={i} style={skillTagStyle}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 style={sectionHeadingStyle}>Projects</h2>
          <div style={{ position: 'relative' as const, paddingLeft: '24px' }}>
            <div style={timelineLineStyle} />
            {projects.map((proj, index) => (
              <div
                key={proj.id}
                style={{
                  position: 'relative' as const,
                  marginBottom: index < projects.length - 1 ? '14px' : '0',
                }}
              >
                <div
                  style={{
                    position: 'absolute' as const,
                    left: '-24px',
                    top: '2px',
                    ...timelineDotStyle,
                  }}
                />
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
                  <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap' }}>
                    {proj.technologies.map((tech, i) => (
                      <span key={i} style={skillTagStyle}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Languages */}
      {(certifications.length > 0 || languages.length > 0) && (
        <div style={{ display: 'flex', gap: '30px', marginTop: '4px' }}>
          {certifications.length > 0 && (
            <div style={{ flex: languages.length > 0 ? '1 1 55%' : '1 1 100%' }}>
              <h2 style={sectionHeadingStyle}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '10px' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666' }}> - {cert.issuer}</span>}
                  {cert.date && (
                    <span style={{ marginLeft: '6px' }}>
                      <span style={datePillStyle}>{cert.date}</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ flex: certifications.length > 0 ? '1 1 45%' : '1 1 100%' }}>
              <h2 style={sectionHeadingStyle}>Languages</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {languages.map((lang) => (
                  <span key={lang.id} style={skillTagStyle}>
                    {lang.language}
                    {lang.proficiency && ` (${lang.proficiency})`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
