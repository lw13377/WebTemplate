import React from 'react'
import type { TemplateProps } from '../base-styles'
import { pageContainerStyle, hexToRgb, lightenColor } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function NeonDarkTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const { r, g, b } = hexToRgb(themeColor)

  const neonGlow = `rgba(${r}, ${g}, ${b}, 0.6)`
  const neonGlowStrong = `rgba(${r}, ${g}, ${b}, 0.8)`
  const neonGlowSubtle = `rgba(${r}, ${g}, ${b}, 0.15)`
  const darkBg = '#111827'
  const darkCardBg = '#1a2332'
  const darkBorderColor = `rgba(${r}, ${g}, ${b}, 0.3)`

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: 0,
    textShadow: `0 0 10px ${neonGlow}, 0 0 20px ${neonGlowSubtle}`,
    paddingBottom: '6px',
    borderBottom: `1px solid ${darkBorderColor}`,
  }

  const glowingLineStyle: React.CSSProperties = {
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${neonGlow}, transparent)`,
    margin: '14px 0',
    boxShadow: `0 0 6px ${neonGlowSubtle}`,
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: 0,
        lineHeight: 1.5,
        fontSize: '10px',
        backgroundColor: darkBg,
        color: '#e5e7eb',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '32px 40px 24px',
          position: 'relative',
          borderBottom: `2px solid ${darkBorderColor}`,
          boxShadow: `inset 0 -2px 12px ${neonGlowSubtle}`,
        }}
      >
        {/* Neon line accent at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '40px',
            right: '40px',
            height: '2px',
            backgroundColor: themeColor,
            boxShadow: `0 0 8px ${neonGlow}, 0 0 16px ${neonGlowSubtle}`,
          }}
        />

        {personal.name && (
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 900,
              margin: 0,
              color: '#ffffff',
              letterSpacing: '1px',
              lineHeight: 1.1,
              textShadow: `0 0 20px ${neonGlow}, 0 0 40px ${neonGlowSubtle}`,
            }}
          >
            {personal.name}
          </h1>
        )}

        {contactParts.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {contactParts.map((part, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  border: `1px solid ${darkBorderColor}`,
                  borderRadius: '14px',
                  color: themeColor,
                  fontSize: '9px',
                  fontWeight: 500,
                  textShadow: `0 0 6px ${neonGlowSubtle}`,
                }}
              >
                {part}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px 40px 28px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Summary</h2>
            <p style={{ margin: 0, color: '#d1d5db', lineHeight: 1.7, fontSize: '10.5px' }}>{summary}</p>
            <div style={glowingLineStyle} />
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '12px',
                  padding: '10px 14px',
                  backgroundColor: darkCardBg,
                  borderRadius: '6px',
                  borderLeft: `3px solid ${themeColor}`,
                  boxShadow: `0 0 8px ${neonGlowSubtle}, inset 0 0 4px rgba(0,0,0,0.3)`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: '#ffffff' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span
                      style={{
                        fontSize: '8.5px',
                        color: themeColor,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        marginLeft: '8px',
                        textShadow: `0 0 6px ${neonGlowSubtle}`,
                      }}
                    >
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '2px', textShadow: `0 0 4px ${neonGlowSubtle}` }}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#9ca3af', fontWeight: 400, textShadow: 'none' }}> | {exp.location}</span>}
                  </div>
                )}
                {exp.description && (
                  <div style={{ marginTop: '5px', color: '#d1d5db', lineHeight: 1.6, whiteSpace: 'pre-line', fontSize: '10px' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
            <div style={glowingLineStyle} />
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px 14px',
                  backgroundColor: darkCardBg,
                  borderRadius: '6px',
                  borderLeft: `3px solid ${themeColor}`,
                  boxShadow: `0 0 8px ${neonGlowSubtle}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#ffffff' }}>{edu.degree}</span>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '8.5px', color: themeColor, fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <div style={{ fontSize: '10px', color: themeColor, fontWeight: 600, marginTop: '1px' }}>
                    {edu.school}
                    {edu.location && <span style={{ color: '#9ca3af', fontWeight: 400 }}> | {edu.location}</span>}
                  </div>
                )}
                {edu.gpa && <div style={{ fontSize: '9px', color: '#9ca3af', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
            <div style={glowingLineStyle} />
          </div>
        )}

        {/* Skills as neon pills */}
        {allSkills.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '14px',
                    fontSize: '9px',
                    fontWeight: 600,
                    color: themeColor,
                    border: `1px solid ${darkBorderColor}`,
                    backgroundColor: neonGlowSubtle,
                    textShadow: `0 0 6px ${neonGlowSubtle}`,
                    boxShadow: `0 0 4px ${neonGlowSubtle}`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div style={glowingLineStyle} />
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px 14px',
                  backgroundColor: darkCardBg,
                  borderRadius: '6px',
                  borderLeft: `3px solid ${themeColor}`,
                  boxShadow: `0 0 8px ${neonGlowSubtle}`,
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10.5px', color: '#ffffff' }}>{proj.name}</span>
                  {proj.url && (
                    <span style={{ color: themeColor, marginLeft: '8px', fontSize: '8.5px', textShadow: `0 0 4px ${neonGlowSubtle}` }}>
                      {proj.url}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <div style={{ marginTop: '3px', color: '#d1d5db', lineHeight: 1.6, fontSize: '10px' }}>{proj.description}</div>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '8px',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          border: `1px solid ${themeColor}`,
                          color: themeColor,
                          fontWeight: 600,
                          textShadow: `0 0 4px ${neonGlowSubtle}`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={glowingLineStyle} />
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '4px' }}>
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: themeColor,
                    boxShadow: `0 0 6px ${neonGlow}`,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10px', color: '#ffffff' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#9ca3af', fontSize: '9px' }}> - {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#6b7280', marginLeft: '6px', fontSize: '8.5px' }}>({cert.date})</span>}
                </div>
              </div>
            ))}
            <div style={glowingLineStyle} />
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 style={sectionHeadingStyle}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  style={{
                    display: 'inline-block',
                    padding: '5px 14px',
                    borderRadius: '16px',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    color: themeColor,
                    border: `1.5px solid ${themeColor}`,
                    backgroundColor: neonGlowSubtle,
                    textShadow: `0 0 6px ${neonGlowSubtle}`,
                    boxShadow: `0 0 6px ${neonGlowSubtle}`,
                  }}
                >
                  {lang.language}
                  {lang.proficiency && <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: '4px', textShadow: 'none' }}>({lang.proficiency})</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom neon line */}
      <div
        style={{
          height: '2px',
          margin: '0 40px',
          backgroundColor: themeColor,
          boxShadow: `0 0 8px ${neonGlow}, 0 0 16px ${neonGlowSubtle}`,
        }}
      />
    </div>
  )
}
