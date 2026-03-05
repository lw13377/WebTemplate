import React from 'react'
import type { TemplateProps } from '../base-styles'
import { hexToRgb, lightenColor, pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function WaveTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const rgb = hexToRgb(themeColor)

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    marginBottom: '8px',
    marginTop: '0',
  }

  const waveDividerStyle: React.CSSProperties = {
    height: '20px',
    marginTop: '16px',
    marginBottom: '16px',
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`,
    borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
    position: 'relative' as const,
  }

  const invertedWaveDividerStyle: React.CSSProperties = {
    height: '20px',
    marginTop: '16px',
    marginBottom: '16px',
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`,
    borderRadius: '0% 0% 50% 50% / 0% 0% 100% 100%',
    position: 'relative' as const,
  }

  const pillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '9px',
    fontWeight: 500,
    backgroundColor: lightenColor(themeColor, 0.88),
    color: themeColor,
    marginRight: '6px',
    marginBottom: '6px',
  }

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
      {/* Header with curved bottom */}
      <div
        style={{
          backgroundColor: themeColor,
          padding: '32px 44px 36px 44px',
          borderRadius: '0 0 50% 50% / 0 0 40px 40px',
          textAlign: 'center' as const,
        }}
      >
        {personal.name && (
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 300,
              margin: 0,
              color: '#ffffff',
              letterSpacing: '2px',
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
              justifyContent: 'center',
              gap: '4px',
              marginTop: '10px',
              fontSize: '9.5px',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            {contactParts.map((part, i) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < contactParts.length - 1 && (
                  <span style={{ opacity: 0.5, margin: '0 4px' }}>{'\u2022'}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '12px 44px 32px 44px' }}>
        {/* Summary */}
        {summary && (
          <div>
            <div style={waveDividerStyle} />
            <div style={{ textAlign: 'center' as const }}>
              <h2 style={sectionHeadingStyle}>Summary</h2>
              <p
                style={{
                  margin: 0,
                  color: '#555',
                  lineHeight: 1.7,
                  fontSize: '10px',
                  maxWidth: '460px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {summary}
              </p>
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <div style={invertedWaveDividerStyle} />
            <h2 style={sectionHeadingStyle}>Experience</h2>
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: '14px',
                  paddingLeft: '14px',
                  borderLeft: `3px solid ${lightenColor(themeColor, 0.6)}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '9px', color: themeColor, fontWeight: 500, whiteSpace: 'nowrap' as const }}>
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                    {exp.company}
                    {exp.location && `, ${exp.location}`}
                  </div>
                )}
                {exp.description && (
                  <div
                    style={{
                      marginTop: '5px',
                      color: '#444',
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
            <div style={waveDividerStyle} />
            <h2 style={sectionHeadingStyle}>Education</h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: '10px',
                  paddingLeft: '14px',
                  borderLeft: `3px solid ${lightenColor(themeColor, 0.7)}`,
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

        {/* Skills */}
        {allSkills.length > 0 && (
          <div>
            <div style={invertedWaveDividerStyle} />
            <h2 style={{ ...sectionHeadingStyle, textAlign: 'center' as const }}>Skills</h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {allSkills.map((skill, i) => (
                <span key={i} style={pillStyle}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <div style={waveDividerStyle} />
            <h2 style={sectionHeadingStyle}>Projects</h2>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: '12px',
                  paddingLeft: '14px',
                  borderLeft: `3px solid ${lightenColor(themeColor, 0.6)}`,
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={invertedWaveDividerStyle} />
            <h2 style={sectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div
                key={cert.id}
                style={{
                  marginBottom: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{cert.name}</span>
                  {cert.issuer && (
                    <span style={{ color: '#666', marginLeft: '6px', fontSize: '9px' }}>- {cert.issuer}</span>
                  )}
                </div>
                {cert.date && (
                  <span
                    style={{
                      fontSize: '9px',
                      color: themeColor,
                      fontWeight: 500,
                      whiteSpace: 'nowrap' as const,
                    }}
                  >
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div style={waveDividerStyle} />
            <h2 style={{ ...sectionHeadingStyle, textAlign: 'center' as const }}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px' }}>
              {languages.map((lang) => (
                <span key={lang.id} style={pillStyle}>
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
