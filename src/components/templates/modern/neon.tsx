import React from 'react'
import type { TemplateProps } from '../base-styles'
import { hexToRgb, pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function NeonTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const rgb = hexToRgb(themeColor)

  const darkBg = '#1a1a2e'
  const darkerBg = '#16162a'
  const cardBg = '#222240'
  const textPrimary = '#e8e8f0'
  const textSecondary = '#a0a0b8'
  const textMuted = '#7070888'

  const glowShadow = `0 0 8px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4), 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`
  const subtleGlow = `0 0 4px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2.5px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: '20px',
    paddingBottom: '6px',
    borderBottom: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
    textShadow: `0 0 10px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`,
  }

  const glowPillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '9px',
    fontWeight: 600,
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
    color: themeColor,
    marginRight: '6px',
    marginBottom: '6px',
    border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
    boxShadow: subtleGlow,
  }

  const dateBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '10px',
    fontSize: '9px',
    fontWeight: 500,
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`,
    color: themeColor,
    whiteSpace: 'nowrap' as const,
    border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: darkBg,
        color: textPrimary,
      }}
    >
      {/* Neon header bar */}
      <div
        style={{
          height: '4px',
          backgroundColor: themeColor,
          boxShadow: glowShadow,
        }}
      />

      {/* Header */}
      <div
        style={{
          padding: '30px 40px 24px 40px',
          backgroundColor: darkerBg,
          borderBottom: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
        }}
      >
        {personal.name && (
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              margin: 0,
              color: themeColor,
              letterSpacing: '1px',
              textShadow: `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6), 0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
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
              gap: '4px',
              marginTop: '10px',
              fontSize: '9.5px',
              color: textSecondary,
            }}
          >
            {contactParts.map((part, i) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < contactParts.length - 1 && (
                  <span style={{ color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`, margin: '0 6px' }}>
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '4px 40px 32px 40px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <h2 style={sectionHeadingStyle}>Summary</h2>
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: cardBg,
                borderRadius: '6px',
                borderLeft: `3px solid ${themeColor}`,
                boxShadow: `inset 0 0 12px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`,
              }}
            >
              <p style={{ margin: 0, color: textSecondary, lineHeight: 1.65, fontSize: '10px' }}>
                {summary}
              </p>
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '14px',
                  padding: '12px 14px',
                  backgroundColor: cardBg,
                  borderRadius: '6px',
                  borderLeft: `2px solid ${themeColor}`,
                  boxShadow: idx === 0 ? subtleGlow : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: textPrimary }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={dateBadgeStyle}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '3px' }}>
                    {exp.company}
                    {exp.location && (
                      <span style={{ color: textSecondary, fontWeight: 400 }}> | {exp.location}</span>
                    )}
                  </div>
                )}
                {exp.description && (
                  <div
                    style={{
                      marginTop: '6px',
                      color: textSecondary,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line' as const,
                    }}
                  >
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
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px 14px',
                  backgroundColor: cardBg,
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: textPrimary }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={dateBadgeStyle}>
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 500, marginTop: '2px' }}>
                    {edu.school}
                    {edu.location && (
                      <span style={{ color: textSecondary, fontWeight: 400 }}> | {edu.location}</span>
                    )}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ marginTop: '2px', color: textSecondary, fontSize: '9.5px' }}>
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {allSkills.map((skill, i) => (
                <span key={i} style={glowPillStyle}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: '12px',
                  padding: '10px 14px',
                  backgroundColor: cardBg,
                  borderRadius: '6px',
                  borderLeft: `2px solid ${themeColor}`,
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: textPrimary }}>{proj.name}</span>
                  {proj.url && (
                    <span
                      style={{
                        color: themeColor,
                        marginLeft: '8px',
                        fontSize: '9px',
                        textShadow: `0 0 6px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`,
                      }}
                    >
                      {proj.url}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: textSecondary, lineHeight: 1.6 }}>
                    {proj.description}
                  </div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap' }}>
                    {proj.technologies.map((tech, i) => (
                      <span key={i} style={glowPillStyle}>{tech}</span>
                    ))}
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
              <div
                key={cert.id}
                style={{
                  marginBottom: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '6px 12px',
                  backgroundColor: cardBg,
                  borderRadius: '4px',
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: textPrimary }}>{cert.name}</span>
                  {cert.issuer && (
                    <span style={{ color: textSecondary, marginLeft: '6px', fontSize: '9px' }}>
                      - {cert.issuer}
                    </span>
                  )}
                </div>
                {cert.date && <span style={dateBadgeStyle}>{cert.date}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang) => (
                <span key={lang.id} style={glowPillStyle}>
                  {lang.language}
                  {lang.proficiency && ` - ${lang.proficiency}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
