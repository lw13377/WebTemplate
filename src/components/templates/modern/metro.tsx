import React from 'react'
import type { TemplateProps } from '../base-styles'
import { hexToRgb, lightenColor, pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function MetroTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const rgb = hexToRgb(themeColor)

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e8e8e8',
    borderTop: `4px solid ${themeColor}`,
    padding: '14px 16px',
    marginBottom: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  }

  const cardHeaderStyle: React.CSSProperties = {
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
    padding: '8px 12px',
    borderRadius: '4px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    margin: 0,
  }

  const pillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '9px',
    fontWeight: 600,
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
    color: themeColor,
    marginRight: '6px',
    marginBottom: '6px',
    border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: '#f4f4f8',
      }}
    >
      {/* Header Card */}
      <div
        style={{
          backgroundColor: themeColor,
          padding: '28px 36px',
          color: '#ffffff',
        }}
      >
        {personal.name && (
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 800,
              margin: 0,
              color: '#ffffff',
              letterSpacing: '0.5px',
            }}
          >
            {personal.name}
          </h1>
        )}
        {contactParts.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '10px',
              fontSize: '9.5px',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {contactParts.map((part, i) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < contactParts.length - 1 && (
                  <span style={{ opacity: 0.5 }}>|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '16px 28px 28px 28px' }}>
        {/* Summary Card */}
        {summary && (
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  width: '4px',
                  height: '16px',
                  backgroundColor: themeColor,
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
              <h2 style={sectionTitleStyle}>Summary</h2>
            </div>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.65, fontSize: '10px' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience Card */}
        {experience.length > 0 && (
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  width: '4px',
                  height: '16px',
                  backgroundColor: themeColor,
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
              <h2 style={sectionTitleStyle}>Experience</h2>
            </div>
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: idx < experience.length - 1 ? '12px' : '0',
                  paddingBottom: idx < experience.length - 1 ? '12px' : '0',
                  borderBottom: idx < experience.length - 1 ? '1px solid #eee' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span
                      style={{
                        fontSize: '9px',
                        color: themeColor,
                        fontWeight: 600,
                        whiteSpace: 'nowrap' as const,
                        backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}
                    >
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                    {exp.company}
                    {exp.location && ` - ${exp.location}`}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' as const }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education Card */}
        {education.length > 0 && (
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  width: '4px',
                  height: '16px',
                  backgroundColor: themeColor,
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
              <h2 style={sectionTitleStyle}>Education</h2>
            </div>
            {education.map((edu, idx) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: idx < education.length - 1 ? '10px' : '0',
                  paddingBottom: idx < education.length - 1 ? '10px' : '0',
                  borderBottom: idx < education.length - 1 ? '1px solid #eee' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap' as const }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
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

        {/* Skills Card */}
        {allSkills.length > 0 && (
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  width: '4px',
                  height: '16px',
                  backgroundColor: themeColor,
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
              <h2 style={sectionTitleStyle}>Skills</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {allSkills.map((skill, i) => (
                <span key={i} style={pillStyle}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Card */}
        {projects.length > 0 && (
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div
                style={{
                  width: '4px',
                  height: '16px',
                  backgroundColor: themeColor,
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
              <h2 style={sectionTitleStyle}>Projects</h2>
            </div>
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: idx < projects.length - 1 ? '10px' : '0',
                  paddingBottom: idx < projects.length - 1 ? '10px' : '0',
                  borderBottom: idx < projects.length - 1 ? '1px solid #eee' : 'none',
                }}
              >
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
                      <span key={i} style={pillStyle}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom row: Certifications and Languages side by side */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Certifications Card */}
          {certifications.length > 0 && (
            <div style={{ ...cardStyle, flex: languages.length > 0 ? 1 : '1 1 100%' }}>
              <div style={cardHeaderStyle}>
                <div
                  style={{
                    width: '4px',
                    height: '16px',
                    backgroundColor: themeColor,
                    borderRadius: '2px',
                    flexShrink: 0,
                  }}
                />
                <h2 style={sectionTitleStyle}>Certifications</h2>
              </div>
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
          )}

          {/* Languages Card */}
          {languages.length > 0 && (
            <div style={{ ...cardStyle, flex: certifications.length > 0 ? 1 : '1 1 100%' }}>
              <div style={cardHeaderStyle}>
                <div
                  style={{
                    width: '4px',
                    height: '16px',
                    backgroundColor: themeColor,
                    borderRadius: '2px',
                    flexShrink: 0,
                  }}
                />
                <h2 style={sectionTitleStyle}>Languages</h2>
              </div>
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '5px',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '10px' }}>{lang.language}</span>
                  {lang.proficiency && (
                    <span style={pillStyle}>{lang.proficiency}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
