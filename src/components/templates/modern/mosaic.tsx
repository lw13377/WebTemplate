import React from 'react'
import type { TemplateProps } from '../base-styles'
import { hexToRgb, lightenColor, pageContainerStyle } from '../base-styles'
import { getAllSkills, renderContactLine, formatDateRange } from '../section-helpers'

export default function MosaicTemplate({ content, themeColor, fontFamily }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, languages } = content
  const allSkills = getAllSkills(skills)
  const contactParts = renderContactLine(personal)
  const rgb = hexToRgb(themeColor)

  const tintedBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`
  const whiteBg = '#ffffff'

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: themeColor,
    marginBottom: '10px',
    marginTop: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const sectionBlockStyle = (isEven: boolean): React.CSSProperties => ({
    backgroundColor: isEven ? tintedBg : whiteBg,
    padding: '16px 40px',
  })

  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '3px',
    fontSize: '9px',
    fontWeight: 600,
    backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
    color: themeColor,
    marginRight: '5px',
    marginBottom: '5px',
    border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
  }

  const dotDecoStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: themeColor,
    flexShrink: 0,
  }

  // Build ordered sections to alternate backgrounds
  let sectionIndex = 0

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
      {/* Header - always uses themeColor background */}
      <div
        style={{
          backgroundColor: themeColor,
          padding: '28px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '16px',
        }}
      >
        <div>
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
        </div>
        {contactParts.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'flex-end',
              gap: '3px',
            }}
          >
            {contactParts.map((part, i) => (
              <span
                key={i}
                style={{
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.85)',
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {part}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Mosaic stripe accent */}
      <div style={{ display: 'flex', height: '4px' }}>
        <div style={{ flex: 1, backgroundColor: themeColor }} />
        <div style={{ flex: 1, backgroundColor: lightenColor(themeColor, 0.3) }} />
        <div style={{ flex: 1, backgroundColor: lightenColor(themeColor, 0.6) }} />
        <div style={{ flex: 1, backgroundColor: lightenColor(themeColor, 0.8) }} />
      </div>

      {/* Summary */}
      {summary && (
        <div style={sectionBlockStyle(sectionIndex++ % 2 === 0)}>
          <h2 style={sectionHeadingStyle}>
            <span style={dotDecoStyle} />
            Summary
          </h2>
          <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: '10px' }}>
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={sectionBlockStyle(sectionIndex++ % 2 === 0)}>
          <h2 style={sectionHeadingStyle}>
            <span style={dotDecoStyle} />
            Experience
          </h2>
          {experience.map((exp, idx) => (
            <div
              key={exp.id}
              style={{
                marginBottom: idx < experience.length - 1 ? '14px' : '0',
                paddingBottom: idx < experience.length - 1 ? '14px' : '0',
                borderBottom: idx < experience.length - 1 ? `1px dashed rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '11px', color: '#1a1a1a' }}>{exp.title}</span>
                {(exp.startDate || exp.endDate) && (
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      color: themeColor,
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
                  {exp.location && ` | ${exp.location}`}
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
        <div style={sectionBlockStyle(sectionIndex++ % 2 === 0)}>
          <h2 style={sectionHeadingStyle}>
            <span style={dotDecoStyle} />
            Education
          </h2>
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

      {/* Skills */}
      {allSkills.length > 0 && (
        <div style={sectionBlockStyle(sectionIndex++ % 2 === 0)}>
          <h2 style={sectionHeadingStyle}>
            <span style={dotDecoStyle} />
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {allSkills.map((skill, i) => (
              <span key={i} style={tagStyle}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={sectionBlockStyle(sectionIndex++ % 2 === 0)}>
          <h2 style={sectionHeadingStyle}>
            <span style={dotDecoStyle} />
            Projects
          </h2>
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              style={{
                marginBottom: idx < projects.length - 1 ? '12px' : '0',
                paddingBottom: idx < projects.length - 1 ? '12px' : '0',
                borderBottom: idx < projects.length - 1 ? `1px dashed rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` : 'none',
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
                    <span key={i} style={tagStyle}>{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={sectionBlockStyle(sectionIndex++ % 2 === 0)}>
          <h2 style={sectionHeadingStyle}>
            <span style={dotDecoStyle} />
            Certifications
          </h2>
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
                <span style={{ fontSize: '9px', color: themeColor, fontWeight: 500, whiteSpace: 'nowrap' as const }}>
                  {cert.date}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={sectionBlockStyle(sectionIndex++ % 2 === 0)}>
          <h2 style={sectionHeadingStyle}>
            <span style={dotDecoStyle} />
            Languages
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {languages.map((lang) => (
              <span key={lang.id} style={tagStyle}>
                {lang.language}
                {lang.proficiency && ` - ${lang.proficiency}`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
