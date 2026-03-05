import React from 'react'
import type { TemplateProps } from '../base-styles'
import { hexToRgb, lightenColor, darkenColor, pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function SplitTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const rgb = hexToRgb(themeColor)

  const leftColumnWidth = '38%'
  const rightColumnWidth = '62%'

  const leftSectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: '#ffffff',
    marginBottom: '10px',
    marginTop: '20px',
    paddingBottom: '6px',
    borderBottom: '1px solid rgba(255,255,255,0.25)',
  }

  const rightSectionHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: '20px',
    paddingBottom: '6px',
    borderBottom: `2px solid ${lightenColor(themeColor, 0.7)}`,
  }

  const leftPillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '9px',
    fontWeight: 500,
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#ffffff',
    marginRight: '5px',
    marginBottom: '5px',
    border: '1px solid rgba(255,255,255,0.2)',
  }

  const rightPillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '9px',
    fontWeight: 500,
    backgroundColor: lightenColor(themeColor, 0.9),
    color: themeColor,
    marginRight: '5px',
    marginBottom: '5px',
  }

  return (
    <div
      style={{
        ...pageContainerStyle,
        fontFamily: `"${fontFamily}", sans-serif`,
        padding: '0',
        lineHeight: 1.5,
        fontSize: '10px',
        display: 'flex',
      }}
    >
      {/* Left Column - Colored background */}
      <div
        style={{
          width: leftColumnWidth,
          backgroundColor: themeColor,
          color: '#ffffff',
          padding: '32px 22px',
          boxSizing: 'border-box' as const,
          flexShrink: 0,
        }}
      >
        {/* Name */}
        {personal.name && (
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 800,
              margin: 0,
              color: '#ffffff',
              lineHeight: 1.2,
              wordBreak: 'break-word' as const,
            }}
          >
            {personal.name}
          </h1>
        )}

        {/* Contact Info */}
        {contactParts.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h2 style={leftSectionHeadingStyle}>Contact</h2>
            {contactParts.map((part, i) => (
              <div
                key={i}
                style={{
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '6px',
                  wordBreak: 'break-all' as const,
                }}
              >
                {part}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <div>
            <h2 style={leftSectionHeadingStyle}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {allSkills.map((skill, i) => (
                <span key={i} style={leftPillStyle}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 style={leftSectionHeadingStyle}>Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: '#ffffff' }}>{lang.language}</div>
                {lang.proficiency && (
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '1px' }}>
                    {lang.proficiency}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={leftSectionHeadingStyle}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: '#ffffff' }}>{cert.name}</div>
                {cert.issuer && (
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '1px' }}>
                    {cert.issuer}
                  </div>
                )}
                {cert.date && (
                  <div style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.55)', marginTop: '1px' }}>
                    {cert.date}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column - White background */}
      <div
        style={{
          width: rightColumnWidth,
          backgroundColor: '#ffffff',
          padding: '32px 28px',
          boxSizing: 'border-box' as const,
        }}
      >
        {/* Summary */}
        {summary && (
          <div>
            <h2 style={{ ...rightSectionHeadingStyle, marginTop: '0' }}>Summary</h2>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10px' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={rightSectionHeadingStyle}>Experience</h2>
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: idx < experience.length - 1 ? '14px' : '0',
                  paddingBottom: idx < experience.length - 1 ? '14px' : '0',
                  borderBottom: idx < experience.length - 1 ? `1px solid ${lightenColor(themeColor, 0.85)}` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span
                      style={{
                        fontSize: '9px',
                        color: themeColor,
                        fontWeight: 500,
                        whiteSpace: 'nowrap' as const,
                      }}
                    >
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
            <h2 style={rightSectionHeadingStyle}>Education</h2>
            {education.map((edu, idx) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: idx < education.length - 1 ? '10px' : '0',
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

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={rightSectionHeadingStyle}>Projects</h2>
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: idx < projects.length - 1 ? '12px' : '0',
                  paddingBottom: idx < projects.length - 1 ? '12px' : '0',
                  borderBottom: idx < projects.length - 1 ? `1px solid ${lightenColor(themeColor, 0.85)}` : 'none',
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
                      <span key={i} style={rightPillStyle}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
