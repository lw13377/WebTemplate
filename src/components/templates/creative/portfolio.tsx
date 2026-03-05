import React from 'react'
import type { TemplateProps } from '@/components/templates/base-styles'
import { hexToRgb, lightenColor, darkenColor, pageContainerStyle } from '@/components/templates/base-styles'

export default function PortfolioTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = skills.flatMap(s => s.items)

  const { r, g, b } = hexToRgb(themeColor)
  const lightTint = lightenColor(themeColor, 0.92)
  const medTint = lightenColor(themeColor, 0.75)
  const darkAccent = darkenColor(themeColor, 0.1)

  const contactParts: string[] = []
  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)
  if (personal.website) contactParts.push(personal.website)
  if (personal.linkedin) contactParts.push(personal.linkedin)

  const cardStyle: React.CSSProperties = {
    border: `1px solid #e5e5e5`,
    borderRadius: '8px',
    padding: '14px 16px',
    backgroundColor: '#ffffff',
    borderTop: `3px solid ${themeColor}`,
    boxSizing: 'border-box',
  }

  const cardTitleStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }

  const titleBarStyle: React.CSSProperties = {
    width: '14px',
    height: '3px',
    backgroundColor: themeColor,
    borderRadius: '2px',
    flexShrink: 0,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: '#f4f4f6',
      }}
    >
      {/* Header Card */}
      <div
        style={{
          margin: '16px 16px 0 16px',
          ...cardStyle,
          borderTop: 'none',
          padding: '20px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          background: `linear-gradient(135deg, ${themeColor} 0%, ${darkAccent} 100%)`,
          border: 'none',
          color: '#ffffff',
        }}
      >
        {/* Photo placeholder circle */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '20px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          {personal.name ? personal.name.charAt(0).toUpperCase() : '?'}
        </div>
        <div style={{ flex: 1 }}>
          {personal.name && (
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 800,
                margin: 0,
                color: '#ffffff',
                letterSpacing: '-0.3px',
                lineHeight: 1.15,
              }}
            >
              {personal.name}
            </h1>
          )}
          {contactParts.length > 0 && (
            <div
              style={{
                marginTop: '6px',
                fontSize: '8.5px',
                color: 'rgba(255,255,255,0.8)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              {contactParts.map((cp, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span
                    style={{
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      display: 'inline-block',
                    }}
                  />
                  {cp}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body grid of cards */}
      <div
        style={{
          padding: '10px 16px 16px 16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        {/* Summary Card - full width */}
        {summary && (
          <div style={{ ...cardStyle, width: '100%', boxSizing: 'border-box' }}>
            <h2 style={cardTitleStyle}>
              <div style={titleBarStyle} />
              About
            </h2>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10.5px' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience Card - full width */}
        {experience.length > 0 && (
          <div style={{ ...cardStyle, width: '100%', boxSizing: 'border-box' }}>
            <h2 style={cardTitleStyle}>
              <div style={titleBarStyle} />
              Experience
            </h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '12px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '2px' }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#888', fontWeight: 400 }}> | {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '4px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects Card - full width, prominent */}
        {projects.length > 0 && (
          <div
            style={{
              ...cardStyle,
              width: '100%',
              boxSizing: 'border-box',
              borderTop: `4px solid ${themeColor}`,
              backgroundColor: '#fefefe',
            }}
          >
            <h2
              style={{
                ...cardTitleStyle,
                fontSize: '12px',
              }}
            >
              <div style={{ ...titleBarStyle, width: '18px', height: '4px' }} />
              Projects
            </h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    flex: '1 1 calc(50% - 5px)',
                    minWidth: '200px',
                    padding: '10px 12px',
                    backgroundColor: lightTint,
                    borderRadius: '6px',
                    borderLeft: `3px solid ${themeColor}`,
                    boxSizing: 'border-box',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#1a1a1a' }}>{proj.name}</span>
                    {proj.url && (
                      <span style={{ color: themeColor, marginLeft: '6px', fontSize: '8.5px' }}>{proj.url}</span>
                    )}
                  </div>
                  {proj.description && (
                    <div style={{ marginTop: '3px', color: '#555', lineHeight: 1.5, fontSize: '9.5px' }}>
                      {proj.description}
                    </div>
                  )}
                  {proj.technologies.length > 0 && (
                    <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {proj.technologies.map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            display: 'inline-block',
                            padding: '2px 7px',
                            borderRadius: '10px',
                            fontSize: '8px',
                            fontWeight: 600,
                            backgroundColor: '#ffffff',
                            color: themeColor,
                            border: `1px solid ${medTint}`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Card - half width */}
        {education.length > 0 && (
          <div
            style={{
              ...cardStyle,
              flex: '1 1 calc(50% - 5px)',
              minWidth: '200px',
              boxSizing: 'border-box',
            }}
          >
            <h2 style={cardTitleStyle}>
              <div style={titleBarStyle} />
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '10.5px', color: '#1a1a1a' }}>{edu.degree}</div>
                {edu.school && (
                  <div style={{ fontSize: '9.5px', color: themeColor, fontWeight: 600, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#888', fontWeight: 400 }}> | {edu.location}</span>}
                  </div>
                )}
                {(edu.startDate || edu.endDate) && (
                  <div style={{ fontSize: '8.5px', color: '#888', marginTop: '2px' }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ marginTop: '2px', color: '#666', fontSize: '9px' }}>GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills Card - half width */}
        {allSkills.length > 0 && (
          <div
            style={{
              ...cardStyle,
              flex: '1 1 calc(50% - 5px)',
              minWidth: '200px',
              boxSizing: 'border-box',
            }}
          >
            <h2 style={cardTitleStyle}>
              <div style={titleBarStyle} />
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '3px 9px',
                    borderRadius: '12px',
                    fontSize: '8.5px',
                    fontWeight: 600,
                    backgroundColor: lightTint,
                    color: darkAccent,
                    border: `1px solid ${medTint}`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Card */}
        {certifications.length > 0 && (
          <div
            style={{
              ...cardStyle,
              flex: '1 1 calc(50% - 5px)',
              minWidth: '200px',
              boxSizing: 'border-box',
            }}
          >
            <h2 style={cardTitleStyle}>
              <div style={titleBarStyle} />
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div
                key={cert.id}
                style={{
                  marginBottom: '8px',
                  padding: '6px 10px',
                  backgroundColor: lightTint,
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '9.5px', color: '#1a1a1a' }}>{cert.name}</div>
                {cert.issuer && (
                  <div style={{ fontSize: '8.5px', color: '#666', marginTop: '1px' }}>{cert.issuer}</div>
                )}
                {cert.date && (
                  <div style={{ fontSize: '8px', color: '#999', marginTop: '1px' }}>{cert.date}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages Card */}
        {languages.length > 0 && (
          <div
            style={{
              ...cardStyle,
              flex: '1 1 calc(50% - 5px)',
              minWidth: '200px',
              boxSizing: 'border-box',
            }}
          >
            <h2 style={cardTitleStyle}>
              <div style={titleBarStyle} />
              Languages
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: lightTint,
                    border: `1px solid ${medTint}`,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '10px', color: darkAccent }}>{lang.language}</div>
                  {lang.proficiency && (
                    <div style={{ fontSize: '8px', color: '#888', marginTop: '1px' }}>{lang.proficiency}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
